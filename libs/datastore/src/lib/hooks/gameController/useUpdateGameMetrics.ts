import {useCallback} from 'react';
import {T_GameMetrics} from 'TS_General';

import {useGameData} from './useGameData';

export const useUpdateGameMetrics = () => {
  const gameData = useGameData();

  const updateMetrics = useCallback(async (updates: Partial<Omit<T_GameMetrics, 'id'>>) => {
    if (!gameData?.dataStore) return;

    await gameData.dataStore.metrics.where('id').equals(1).modify(updates);
  }, [gameData?.dataStore]);

  const incrementMetric = useCallback(async (field: keyof Omit<T_GameMetrics, 'id'>, amount = 1) => {
    if (!gameData?.dataStore) return;

    await gameData.dataStore.metrics.where('id').equals(1).modify((metrics) => {
      (metrics as any)[field] = ((metrics as any)[field] || 0) + amount;
    });
  }, [gameData?.dataStore]);

  return { updateMetrics, incrementMetric };
};