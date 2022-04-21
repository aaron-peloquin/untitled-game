import {getStats} from '@helper';
import {useCallback} from 'react';
import {T_Band} from 'TS_Band';

import {useActionPoints} from './useActionPoints';

import {useGameData} from '../gameController/useGameData';
import {useGetGameSetting} from '../gameController/useGetGameSetting';

export const useRest = (band?: T_Band) => {
  const {currentAp, maxAp, changeActionPoints} = useActionPoints();
  const hp_per_end = useGetGameSetting('hp_per_end');

  const restoreApAmount = maxAp - currentAp;
  const gameSave = useGameData();
  const restoreAp = useCallback(() => {
    if (gameSave?.dataStore && band?.daysUntilWages && hp_per_end) {
      const daysUntilWages = band.daysUntilWages - 1;
      changeActionPoints(restoreApAmount);
      gameSave.dataStore.band.update(band?.bandId || 1, {daysUntilWages});

      if (band?.mercenaryIds) {
        band?.mercenaryIds.forEach((mercenaryId) => {
          gameSave.dataStore?.mercenaries.where('mercenaryId').equals(mercenaryId).modify((mercenary) => {
            const hpMultiplier = parseInt(hp_per_end.value);
            const stats = getStats(mercenary.level, hpMultiplier, mercenary.ethnicity, mercenary.profession, mercenary.personality);
            mercenary.currentHealth += (stats.maxHealth / 2 + Math.ceil(mercenary.level));
          });
        });
      }
    }
  }, [band?.bandId, band?.daysUntilWages, band?.mercenaryIds, changeActionPoints, gameSave.dataStore, hp_per_end, restoreApAmount]);
  return {currentAp, maxAp, restoreAp, restoreApAmount};
};
