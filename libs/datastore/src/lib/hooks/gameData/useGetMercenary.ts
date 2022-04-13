import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

export const useGetMercenary = (mercenaryId?: number) => {
  const gameData = useGameData();
  const mercenaries = useLiveQuery(() => !mercenaryId ? undefined : gameData.dataStore?.mercenaries.get(mercenaryId), [gameData, mercenaryId]);
  return mercenaries;
};
