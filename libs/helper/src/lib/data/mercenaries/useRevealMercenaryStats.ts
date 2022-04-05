import {useCallback} from 'react';
import {T_GameSave} from 'TS_General';
import {T_Mercenary} from 'TS_Mercenary';

import {db} from '../db';

type useRevealMercenaryStatsArgs = {
    save: T_GameSave | undefined,
    mercenary: T_Mercenary,
    revealStatsCost: number
}
type useRevealMercenaryStatsSig = (args: useRevealMercenaryStatsArgs) => () => void
export const useRevealMercenaryStats:useRevealMercenaryStatsSig = ({save, mercenary, revealStatsCost}) => {
  return useCallback(() => {
    const bandGold = save?.band?.gold || 0;
    const canRevealStats = bandGold >= revealStatsCost;
    if (canRevealStats) {
      const mercenaryId = mercenary.id || 0;
      const saveId = save?.id || 0;
      const newGoldValue = bandGold - revealStatsCost;

      db.gameSaves.update(saveId, {'band.gold': newGoldValue});
      db.mercenaries.update(mercenaryId, {statsVisible: true});
    }
  }, [mercenary.id, revealStatsCost, save?.band?.gold, save?.id]);
};
