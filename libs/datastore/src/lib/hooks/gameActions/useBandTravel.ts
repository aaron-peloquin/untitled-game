import {useCallback} from 'react';
import {T_Location} from 'TS_Location';

import {useActionPoints} from './useActionPoints';

import {useGameData} from '../gameController/useGameData';
import {useGetBand} from '../gameData/useGetBand';

const apCost = 2;

export const useBandTravel = (location: T_Location) => {
  const {changeActionPoints, currentAp} = useActionPoints();
  const hasEnoughAp = currentAp >= apCost;
  const gameData = useGameData();
  const band = useGetBand();
  const bandGold = band?.gold || 0;
  const bandId = band?.bandId || 0;

  const travelCost = Math.round(location.level * 1.5);
  const canAffordTravel = bandGold >= travelCost;

  const travel = useCallback(() => {
    const newGoldValue = bandGold - travelCost;
    const newApValue = currentAp - apCost;

    const canAfford = newGoldValue >= 0 && hasEnoughAp;

    if (gameData?.dataStore && bandId > 0 && canAfford) {
      changeActionPoints(-apCost);
      gameData.dataStore.band.update(bandId, {
        currentAp: newApValue,
        currentLocationId: location.locationId,
        gold: newGoldValue,
      });
    }
  }, [bandGold, bandId, changeActionPoints, currentAp, gameData.dataStore, hasEnoughAp, location.locationId, travelCost]);

  return {apCost, canAffordTravel, hasEnoughAp, travel, travelCost};
};
