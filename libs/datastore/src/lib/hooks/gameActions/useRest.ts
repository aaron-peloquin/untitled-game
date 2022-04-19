import {useCallback} from 'react';
import {T_Band} from 'TS_Band';

import {useActionPoints} from './useActionPoints';

import {useGameData} from '../gameController/useGameData';

export const useRest = (band?: T_Band) => {
  const {currentAp, maxAp, changeActionPoints} = useActionPoints();

  const restoreApAmount = maxAp - currentAp;
  const gameSave = useGameData();
  const restoreAp = useCallback(() => {
    if (gameSave?.dataStore) {
      changeActionPoints(restoreApAmount);
      gameSave.dataStore.band.update(band?.bandId || 1, {daysUntilWages: (band?.daysUntilWages || 1) - 1});
    }
  }, [band?.bandId, band?.daysUntilWages, changeActionPoints, gameSave.dataStore, restoreApAmount]);
  return {currentAp, maxAp, restoreAp, restoreApAmount};
};
