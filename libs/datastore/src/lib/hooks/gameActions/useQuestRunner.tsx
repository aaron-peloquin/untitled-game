import {questRunners} from '@quest';
import {useCallback, useMemo} from 'react';

import {T_QuestResults, T_QuestResultsBand, T_QuestResultsMercenary, T_QuestResultsQuest} from 'TS_Quest';

import {useActionPoints} from './useActionPoints';

import {useGameData} from '../gameController/useGameData';
import {useGetBand} from '../gameData/useGetBand';
import {useGetMercenary} from '../gameData/useGetMercenary';
import {useGetQuest} from '../gameData/useGetQuest';
import {useGetMercenaryStats} from '../general/useGetMercenaryStats';
import {useGetQuestStats} from '../general/useGetQuestStats';

const QUEST_DID_NOT_RUN: T_QuestResults = {
  band: {exp: 0, gold: 0},
  finalStyles: {},
  mercenary: {exp: 0, health: 99999, remove: false},
  outcome: 'Failure',
  quest: {remove: false},
  roundsLog: [{action: 'Something went wrong, they failed to go on quest.', person: 'Something went wrong'}],
};

export const useQuestRunner = () => {
  const gameData = useGameData();
  const band = useGetBand();
  const bandId = band?.bandId || 1;
  const {changeActionPoints, currentAp} = useActionPoints();
  const {dataStore, selectedMercenaryId, selectedQuestId, setSelectedQuestId, setSelectedMercenaryId} = gameData;
  const mercenary = useGetMercenary(selectedMercenaryId);
  const mercenaryStats = useGetMercenaryStats(mercenary);
  const quest = useGetQuest(selectedQuestId);
  const questStats = useGetQuestStats(quest);
  const apCost = 1;
  const hasEnoughAp = currentAp >= apCost;
  const questRunnerText = useMemo(() => {
    if (mercenary && quest) {
      return `Send ${mercenary?.name} to ${quest?.type} ${quest?.targetName}`;
    } else if (mercenary) {
      return `Select a quest to send  ${mercenary?.name} on`;
    } else if (quest) {
      return `Select a mercenary  to ${quest?.type} ${quest?.targetName}`;
    } else {
      return 'Select a mercenary and a quest to send them on';
    }
  }, [mercenary, quest]);

  const updateMercenary = useCallback((mercenaryResults: T_QuestResultsMercenary) => {
    dataStore?.mercenaries.where('mercenaryId').equals(selectedMercenaryId).modify((mercenary) => {
      mercenary.currentHealth = mercenaryResults.health;
      mercenary.level += mercenaryResults.exp;
    });

    // unset mercenary selection
    if (mercenaryResults.remove || mercenaryResults.health <= 0) {
      setSelectedMercenaryId(0);
    }

    if (mercenaryResults.remove) {
      dataStore?.band.where('bandId').equals(bandId).modify((band) => {
        const newMercenaries = band.mercenaryIds.filter((mercenaryId: number) => mercenaryId !== selectedMercenaryId);
        band.mercenaryIds = newMercenaries;
      });
    }
  }, [bandId, dataStore?.band, dataStore?.mercenaries, selectedMercenaryId, setSelectedMercenaryId]);

  const updateQuest = useCallback((questResults: T_QuestResultsQuest) => {
    if (questResults.remove) {
      setSelectedQuestId(0);
      dataStore?.quests.update(selectedQuestId, {questCompletedByMercenaryId: selectedMercenaryId});
    }
  }, [dataStore?.quests, selectedMercenaryId, selectedQuestId, setSelectedQuestId]);

  const updateBand = useCallback((bandResults: T_QuestResultsBand) => {
    dataStore?.band.where('bandId').equals(bandId).modify((band) => {
      band.gold += bandResults.gold;
      band.level += bandResults.exp;
    });
  }, [bandId, dataStore?.band]);


  const runQuest = useCallback<() => T_QuestResults>(() => {
    if (quest?.type && mercenary && quest) {
      const questRunner = questRunners?.[quest?.type];
      if (questRunner) {
        const removeAp = changeActionPoints(-1);
        if (removeAp) {
          const questResults = questRunner({mercenary, mercenaryStats, quest, questStats});
          updateMercenary(questResults.mercenary);
          updateBand(questResults.band);
          updateQuest(questResults.quest);

          return questResults;
        }
      }
    }
    return QUEST_DID_NOT_RUN;
  }, [changeActionPoints, mercenary, mercenaryStats, quest, questStats, updateBand, updateMercenary, updateQuest]);

  return {apCost, hasEnoughAp, mercenary, mercenaryStats, quest, questRunnerText, questStats, runQuest};
};
