import {defaultStats, getStats} from '@helper';
import {useMemo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {useLimitMaxHealth} from '../gameActions/useLimitMaxHealth';
import {useGetGameSetting} from '../gameController/useGetGameSetting';

export const useGetStats = (mercenary: T_Mercenary) => {
  const {mercenaryId, level, ethnicity, profession, personality, currentHealth} = mercenary;
  const hp_per_end = useGetGameSetting('hp_per_end')?.value;
  const stats = useMemo(() => {
    if (hp_per_end) {
      const healthMultiplier = parseInt(hp_per_end);
      return getStats(level, healthMultiplier, ethnicity, profession, personality);
    }
    return defaultStats;
  }, [ethnicity, hp_per_end, level, personality, profession]);

  useLimitMaxHealth(mercenaryId, stats.maxHealth, currentHealth);

  return stats;
};

