import {questRunners} from '@quest';
import {useCallback} from 'react';

import {T_QuestResult, T_QuestResultBand, T_QuestResultMercenary, T_QuestResultQuest} from 'TS_Quest';

import {useGetMercenaryStats} from './useGetMercenaryStats';
import {useGetQuestStats} from './useGetQuestStats';

import {useGameData} from '../gameController/useGameData';
import {useGetBand} from '../gameData/useGetBand';
import {useGetMercenary} from '../gameData/useGetMercenary';
import {useGetQuest} from '../gameData/useGetQuest';

export const useQuestRunner = () => {
  const gameData = useGameData();
  const band = useGetBand();
  const bandId = band?.bandId || 1;
  const {dataStore, selectedMercenaryId, selectedQuestId, setSelectedQuestId} = gameData;
  const mercenary = useGetMercenary(selectedMercenaryId);
  const mercenaryStats = useGetMercenaryStats(mercenary);
  const quest = useGetQuest(selectedQuestId);
  const questStats = useGetQuestStats(quest);

  const updateMercenary = useCallback((mercenaryResults: T_QuestResultMercenary) => {
    dataStore?.mercenaries.where('mercenaryId').equals(selectedMercenaryId).modify((mercenary) => {
      mercenary.currentHealth = mercenaryResults.health;
      mercenary.level += mercenaryResults.exp;
    });

    if (mercenaryResults.remove) {
      dataStore?.band.where('bandId').equals(bandId).modify((band) => {
        const newMercenaries = band.mercenaryIds.filter((mercenaryId) => mercenaryId !== selectedMercenaryId);
        band.mercenaryIds = newMercenaries;
      });
    }
  }, [bandId, dataStore?.band, dataStore?.mercenaries, selectedMercenaryId]);

  const updateQuest = useCallback((questResults: T_QuestResultQuest) => {
    setSelectedQuestId(0);
    if (questResults.remove) {
      dataStore?.quests.update(selectedQuestId, {questCompletedByMercenaryId: selectedMercenaryId});
    }
  }, [dataStore?.quests, selectedMercenaryId, selectedQuestId, setSelectedQuestId]);

  const updateBand = useCallback((bandResults: T_QuestResultBand) => {
    // TODO: exp
    dataStore?.band.where('bandId').equals(bandId).modify((band) => {
      band.gold += bandResults.gold;
      band.level += bandResults.exp;
    });
  }, [bandId, dataStore?.band]);


  const runQuest = useCallback(() => {
    if (quest?.type && mercenary && quest) {
      const questRunner = questRunners?.[quest?.type];
      if (questRunner) {
        const questResults = questRunner({mercenary, mercenaryStats, quest, questStats});
        updateMercenary(questResults.mercenary);
        updateBand(questResults.band);
        updateQuest(questResults.quest);

        return questResults;
      }
    }
  }, [mercenary, mercenaryStats, quest, questStats, updateBand, updateMercenary, updateQuest]);

  return {mercenary, mercenaryStats, quest, questStats, runQuest};
};
