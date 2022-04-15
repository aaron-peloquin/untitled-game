import {questRunners} from '@quest';
import {useCallback} from 'react';

import {T_QuestResultBand, T_QuestResultMercenary, T_QuestResultQuest} from 'TS_Quest';

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
  const {dataStore, selectedMercenaryId, selectedQuestId, setSelectedQuestId, setSelectedMercenaryId} = gameData;
  const mercenary = useGetMercenary(selectedMercenaryId);
  const mercenaryStats = useGetMercenaryStats(mercenary);
  const quest = useGetQuest(selectedQuestId);
  const questStats = useGetQuestStats(quest);

  const updateMercenary = useCallback((mercenaryResults: T_QuestResultMercenary) => {
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

  const updateQuest = useCallback((questResults: T_QuestResultQuest) => {
    if (questResults.remove) {
      setSelectedQuestId(0);
      dataStore?.quests.update(selectedQuestId, {questCompletedByMercenaryId: selectedMercenaryId});
    }
  }, [dataStore?.quests, selectedMercenaryId, selectedQuestId, setSelectedQuestId]);

  const updateBand = useCallback((bandResults: T_QuestResultBand) => {
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
