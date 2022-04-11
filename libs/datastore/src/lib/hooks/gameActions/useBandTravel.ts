import {useCallback} from 'react';
import {T_Location} from 'TS_Location';

import {useGameData} from '../gameController/useGameData';
import {useGetBand} from '../gameData/useGetBand';


export const useBandTravel = (location: T_Location) => {
  const gameData = useGameData();
  const band = useGetBand();
  const bandGold = band?.gold || 0;
  const bandId = band?.bandId || 0;

  const travelCost = Math.round(location.level * 1.5);
  const canAffordTravel = bandGold >= travelCost;

  const travel = useCallback(() => {
    const newGoldValue = bandGold - travelCost;

    if (gameData?.dataStore && bandId > 0 && newGoldValue >= 0) {
      gameData.dataStore.band.update(bandId, {
        currentLocationId: location.locationId,
        gold: newGoldValue,
      });
    }
  }, [bandGold, bandId, gameData.dataStore, location.locationId, travelCost]);

  return {canAffordTravel, travel, travelCost};
};
