import {defaultStats, getStats} from '@helper';
import {useMemo} from 'react';
import {T_Quest} from 'TS_Quest';
import {T_ParsedStats} from 'TS_Stats';

import {useGetGameSetting} from '../gameController/useGetGameSetting';

export const useGetQuestStats = (quest: T_Quest) => {
  const {level, targetEthnicity, targetProfession} = quest;
  const hp_per_end = useGetGameSetting('hp_per_end')?.value;
  const stats = useMemo<T_ParsedStats>(() => {
    if (hp_per_end) {
      const healthMultiplier = parseInt(hp_per_end);
      return getStats(level, healthMultiplier, targetEthnicity, targetProfession);
    }
    return defaultStats;
  }, [targetEthnicity, hp_per_end, level, targetProfession]);

  return stats;
};

