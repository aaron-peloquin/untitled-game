import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

const emptyArray: number[] = [];

export const useListLocationsById = (locationIds?: number[]) => {
  const gameData = useGameData();
  const searchIds = locationIds || emptyArray;
  const location = useLiveQuery(() => gameData.dataStore?.locations.where('locationId').anyOf(searchIds).toArray() || [], [gameData, searchIds]);
  return location;
};
