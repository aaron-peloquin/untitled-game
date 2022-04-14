import {questRunners} from '@quest';
import {useCallback} from 'react';

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

  const updateMercenaryHealth = useCallback((newHealth) => {
    dataStore?.mercenaries.update(selectedMercenaryId, {currentHealth: newHealth});
  }, [dataStore?.mercenaries, selectedMercenaryId]);

  const removeMercenary = useCallback(() => {
    dataStore?.band.where('bandId').equals(bandId).modify((band) => {
      const newMercenaries = band.mercenaryIds.filter((mercenaryId) => mercenaryId !== selectedMercenaryId);
      band.mercenaryIds = newMercenaries;
    });
  }, [bandId, dataStore?.band, selectedMercenaryId]);

  const removeQuest = useCallback(() => {
    dataStore?.quests.update(selectedQuestId, {questCompletedByMercenaryId: selectedMercenaryId});
  }, [dataStore?.quests, selectedMercenaryId, selectedQuestId]);

  const runQuest = useCallback(() => {
    if (quest?.type && mercenary && quest) {
      const questRunner = questRunners?.[quest?.type];
      if (questRunner) {
        const questResults = questRunner({mercenary, mercenaryStats, quest, questStats});
        setSelectedQuestId(0);
        updateMercenaryHealth(questResults.mercenary.mercenaryCurrentHealth);
        questResults.mercenary.removeMercenary && removeMercenary();
        questResults.quest.removeQuest && removeQuest();

        return questResults;
      }
    }
  }, [mercenary, mercenaryStats, quest, questStats, removeMercenary, removeQuest, setSelectedQuestId, updateMercenaryHealth]);

  return {mercenary, mercenaryStats, quest, questStats, runQuest};
};
