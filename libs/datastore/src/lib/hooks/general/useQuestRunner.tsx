import {questRunners} from '@quest';
import {useCallback} from 'react';

import {useGetMercenaryStats} from './useGetMercenaryStats';

import {useGetQuestStats} from './useGetQuestStats';

import {useGameData} from '../gameController/useGameData';
import {useGetMercenary} from '../gameData/useGetMercenary';
import {useGetQuest} from '../gameData/useGetQuest';

export const useQuestRunner = () => {
  const {selectedMercenaryId, selectedQuestId} = useGameData();
  const mercenary = useGetMercenary(selectedMercenaryId);
  const mercenaryStats = useGetMercenaryStats(mercenary);
  const quest = useGetQuest(selectedQuestId);
  const questStats = useGetQuestStats(quest);
  const questRunner = questRunners?.[quest?.type];
  console.log('questRunner', questRunner);
  const runQuest = useCallback(() => {
    const questResults = questRunner({mercenary, mercenaryStats, quest, questStats});
    console.log({questResults, questRunner});
  }, [mercenary, mercenaryStats, quest, questRunner, questStats]);

  return {mercenary, mercenaryStats, quest, questStats, runQuest};
  console.log({mercenary, mercenaryStats, quest, questStats});
};
