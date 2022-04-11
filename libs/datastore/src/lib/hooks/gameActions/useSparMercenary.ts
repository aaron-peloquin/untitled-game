import {useCallback} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {useGameData} from '../gameController/useGameData';

import {useGetBand} from '../gameData/useGetBand';


export const useSparMercenary = (mercenary: T_Mercenary) => {
  const gameData = useGameData();
  const band = useGetBand();
  const bandGold = band?.gold || 0;
  const bandId = band?.bandId || 0;
  const mercenaryId = mercenary.mercenaryId;

  const sparCostUnsafe = Math.round(mercenary.level * 3) - 6;
  const sparCost = sparCostUnsafe < 0 ? 0 : sparCostUnsafe;
  const canAffordSpar = bandGold >= sparCost;

  const spar = useCallback(() => {
    const newGoldValue = bandGold - sparCost;

    if (gameData?.dataStore && bandId > 0 && newGoldValue >= 0) {
      console.log({mercenaryId});
      // reduce gold
      gameData.dataStore.band.update(bandId, {gold: newGoldValue});
      // show mercenary stats
      gameData.dataStore.mercenaries.update(mercenaryId, {statsVisible: true});
    }
  }, [bandGold, sparCost, gameData.dataStore, bandId, mercenaryId]);

  return {canAffordSpar, spar, sparCost};
};
