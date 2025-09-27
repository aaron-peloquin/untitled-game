import {useLiveQuery} from 'dexie-react-hooks';
import {T_GameMetrics} from 'TS_General';

import {useGameData} from './useGameData';

export const useGetGameMetrics = (): T_GameMetrics | undefined => {
  const gameData = useGameData();
  
  return useLiveQuery(
    async () => {
      if (!gameData?.dataStore) return undefined;
      
      // Get or create the metrics row (id = 1)
      let metrics = await gameData.dataStore.metrics.get(1);
      
      if (!metrics) {
        // Initialize metrics if missing (fallback for edge cases)
        const initialMetrics: Omit<T_GameMetrics, 'id'> = {
          totalDays: 0,
          totalHired: 0,
          totalDeaths: 0,
          totalQuestsCompleted: 0,
          maxBandLevel: 1,
        };
        await gameData.dataStore.metrics.add(initialMetrics);
        metrics = await gameData.dataStore.metrics.get(1);
      }
      
      return metrics;
    },
    [gameData?.dataStore],
  );
};