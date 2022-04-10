import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

export const useGetLocation = (locationId?: number) => {
  const gameData = useGameData();
  const location = useLiveQuery(() => !locationId ? undefined : gameData.dataStore?.locations.get(locationId), [gameData, locationId]);
  return location;
};
