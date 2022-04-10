import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

const emptyArray: number[] = [];

export const useListQuestsById = (questIds?: number[]) => {
  const gameData = useGameData();
  const searchIds = questIds || emptyArray;
  const quests = useLiveQuery(() => gameData.dataStore?.quests.where('questId').anyOf(searchIds).toArray() || [], [gameData, searchIds]);
  return quests;
};
