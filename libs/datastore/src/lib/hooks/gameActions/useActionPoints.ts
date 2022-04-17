import {useCallback} from 'react';

import {useGameData} from '../gameController/useGameData';
import {useGetGameSetting} from '../gameController/useGetGameSetting';
import {useGetBand} from '../gameData/useGetBand';

export const useActionPoints = () => {
  const gameData = useGameData();
  const band = useGetBand();
  const ApPerDay = useGetGameSetting('ap_per_day');
  const bandLevel = Math.round(band?.level || 0);
  const maxAp = parseInt(ApPerDay?.value || '0') * bandLevel;
  const currentAp = band?.actionPoints || 0;

  const changeActionPoints = useCallback((changeAmount: number) => {
    const newAmount = currentAp + changeAmount;

    if (newAmount >= 0 && gameData && band?.bandId) {
      gameData.dataStore?.band.update(band?.bandId, {actionPoints: newAmount});
      return true;
    }
    return false;
  }, [band?.bandId, currentAp, gameData]);

  return {changeActionPoints, currentAp, maxAp};
};
