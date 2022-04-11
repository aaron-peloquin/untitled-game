import {useCallback} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {useGameData} from '../gameController/useGameData';

import {useGetBand} from '../gameData/useGetBand';


export const useHireMercenary = (mercenary: T_Mercenary) => {
  const gameData = useGameData();
  const band = useGetBand();
  const bandGold = band?.gold || 0;
  const bandId = band?.bandId || 0;
  const mercenaryId = mercenary.mercenaryId;

  const hireCost = Math.round(mercenary.level * 4);
  const canAffordHire = bandGold >= hireCost;

  const hire = useCallback(() => {
    const newGoldValue = bandGold - hireCost;

    if (gameData?.dataStore && bandId > 0 && newGoldValue >= 0) {
      console.log({mercenaryId});
      // reduce gold
      gameData.dataStore.band.update(bandId, {gold: newGoldValue});
      // show mercenary stats
      gameData.dataStore.mercenaries.update(mercenaryId, {statsVisible: true});
      // hire mercenary
      gameData.dataStore.band.where('bandId').equals(bandId).modify((band) => band.mercenaryIds.push(mercenaryId));
      // remove mercenary from locations
      gameData.dataStore.locations.where('mercenaryIds').equals(mercenaryId).modify((location) => {
        const newMercenaries = location.mercenaryIds.filter((locMercId) => locMercId !== mercenaryId);
        console.log({newMercenaries});
        location.mercenaryIds = newMercenaries;
      });
    }
  }, [bandGold, hireCost, gameData.dataStore, bandId, mercenaryId]);

  return {canAffordHire, hire, hireCost};
};
