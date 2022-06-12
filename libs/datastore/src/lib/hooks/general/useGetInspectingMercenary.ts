import {useGetMercenaryStats} from './useGetMercenaryStats';

import {useGameData} from '../gameController/useGameData';
import {useGetMercenary} from '../gameData/useGetMercenary';

export const useGetInspectingMercenary = () => {
  const gameData = useGameData();
  const {inspectMercenaryId} = gameData;
  const mercenary = useGetMercenary(inspectMercenaryId);
  const mercenaryStats = useGetMercenaryStats(mercenary);

  return {mercenary, mercenaryStats};
};
