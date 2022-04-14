import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

const emptyArray: number[] = [];


export const useListQuestsById = (questIds?: number[], hideCompleted?: boolean) => {
  const gameData = useGameData();
  const searchIds = questIds || emptyArray;

  return useLiveQuery(() => gameData.dataStore?.quests.where('questId').anyOf(searchIds).and((quest) => hideCompleted ? !quest.questCompletedByMercenaryId : true).toArray() || [], [gameData, searchIds]);
};
