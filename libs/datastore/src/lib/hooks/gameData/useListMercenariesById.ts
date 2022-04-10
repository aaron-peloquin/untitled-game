import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

const emptyArray: number[] = [];

export const useListMercenariesById = (mercenaryIds?: number[]) => {
  const gameData = useGameData();
  const searchIds = mercenaryIds || emptyArray;
  const mercenaries = useLiveQuery(() => gameData.dataStore?.mercenaries.where('mercenaryId').anyOf(searchIds).toArray() || [], [gameData, searchIds]);
  return mercenaries;
};
