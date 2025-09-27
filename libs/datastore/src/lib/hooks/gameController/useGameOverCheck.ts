import {useMemo} from 'react';
import {getStats} from '@helper';

import {useGetBand} from '../gameData/useGetBand';
import {useGetLocation} from '../gameData/useGetLocation';
import {useListLocationsById} from '../gameData/useListLocationsById';
import {useListMercenariesById} from '../gameData/useListMercenariesById';
import {useGetGameSetting} from './useGetGameSetting';

export const useGameOverCheck = () => {
  const band = useGetBand();
  const currentLocation = useGetLocation(band?.currentLocationId);
  const relatedLocations = useListLocationsById(currentLocation?.relatedLocationIds);
  const locationMercenaries = useListMercenariesById(currentLocation?.mercenaryIds);
  const hp_per_end = useGetGameSetting('hp_per_end');

  const gameOverResult = useMemo(() => {
    // Don't trigger game over if data is still loading
    if (!band || !currentLocation || !hp_per_end) {
      return { isGameOver: false };
    }

    // Rule 1: Band has no mercenaries
    const hasNoMercenaries = !band.mercenaryIds || band.mercenaryIds.length === 0;
    
    if (!hasNoMercenaries) {
      return { isGameOver: false };
    }

    // Rule 2: Cannot afford the cheapest hire in current location
    let canAffordAnyHire = false;
    if (locationMercenaries && locationMercenaries.length > 0) {
      const cheapestHireCost = Math.min(...locationMercenaries.map(mercenary => {
        const hpMultiplier = parseInt(hp_per_end.value);
        const stats = getStats(mercenary.level, hpMultiplier, mercenary.ethnicity, mercenary.profession, mercenary.personality);
        return stats._goldHiring;
      }));
      canAffordAnyHire = band.gold >= cheapestHireCost;
    }

    if (canAffordAnyHire) {
      return { isGameOver: false };
    }

    // Rule 3: Cannot afford travel to any related location
    let canAffordAnyTravel = false;
    if (relatedLocations && relatedLocations.length > 0) {
      const cheapestTravelCost = Math.min(...relatedLocations.map(location => Math.round(location.level * 1.5)));
      canAffordAnyTravel = band.gold >= cheapestTravelCost;
    }

    if (canAffordAnyTravel) {
      return { isGameOver: false };
    }

    // All conditions met: Game Over
    return { 
      isGameOver: true,
      reason: `No mercenaries, ${band.gold} gold cannot afford hiring (min ${locationMercenaries?.length ? Math.min(...locationMercenaries.map(mercenary => {
        const hpMultiplier = parseInt(hp_per_end.value);
        const stats = getStats(mercenary.level, hpMultiplier, mercenary.ethnicity, mercenary.profession, mercenary.personality);
        return stats._goldHiring;
      })) : 0}) or travel (min ${relatedLocations?.length ? Math.min(...relatedLocations.map(location => Math.round(location.level * 1.5))) : 0})`
    };

  }, [band, currentLocation, relatedLocations, locationMercenaries, hp_per_end]);

  return gameOverResult;
};