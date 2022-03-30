import {useCallback} from 'react';
import {T_GameSave} from 'TS_General';
import {T_Mercenary} from 'TS_Mercenary';

import {db} from '../db';

type handleHireMercenaryArgs = { save: T_GameSave | undefined, canHire: boolean, mercenary: T_Mercenary}
type useHireMercenarySign = (options: handleHireMercenaryArgs) => () => void

export const useHireMercenary: useHireMercenarySign = ({save, canHire, mercenary}) => {
  return useCallback<() => void>(() => {
    const saveId = save?.id || 0;
    const mercenaryId = mercenary.id || 0;
    const canSave = canHire && mercenary.id && saveId;
    const bandGold = save?.band?.gold || 0;
    const mercenaryCost = mercenary.stats.cost || 1;
    const bandCanHire = bandGold >= mercenaryCost;
    if (canSave) {
      if (bandCanHire) {
        // reduce gold
        const newGoldValue = bandGold - mercenaryCost;
        db.gameSaves.update(saveId, {'band.gold': newGoldValue});
        // hire mercenary
        db.gameSaves.where('id').equals(saveId).modify((save) => save.band.mercenaries.push(mercenaryId));
        // remove mercenary from locations
        db.locations.where('mercenaries').equals(mercenaryId).modify((location) => {
          const newMercenaries = location.mercenaries.filter((mercId) => mercId !== mercenaryId);
          location.mercenaries = newMercenaries;
        });
      }
    }
  }, [canHire, mercenary, save]);
};
