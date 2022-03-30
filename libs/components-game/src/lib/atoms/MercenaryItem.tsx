import {db, useCurrentSave} from '@helper';
import {memo, useCallback} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  canHire?: boolean
  mercenary: T_Mercenary
  fullStats?: boolean
}

const handleHireMercenary = ({save, canHire, mercenary}) => {
  const saveId = save?.id || 0;
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
      console.log('merc', db.locations.where('mercenaries').equals(mercenaryId).toArray());
      db.locations.where('mercenaries').equals(mercenaryId).modify((location) => {
        const newMercenaries = location.mercenaries.filter((mercId) => mercId !== mercenaryId);
        location.mercenaries = newMercenaries;
      });
    }
  }
};

const MercenaryItem: React.FC<Props> = ({canHire, fullStats, mercenary}) => {
  const save = useCurrentSave();
  const bandCanHire = (save?.band?.gold || 0) >= (mercenary.stats.cost || 1);

  const hire = useCallback(() => handleHireMercenary({canHire, mercenary, save}), [canHire, mercenary, save]);
  return <li>
    <div>
      {canHire && <button disabled={!bandCanHire} onClick={hire}>Hire for {mercenary.stats.cost} gold</button>}
      {` `}
      <strong>{mercenary.name}</strong> level {Math.round(mercenary.level)} {mercenary.ethnicity} {mercenary.profession},
      {fullStats && ` ${mercenary.health} hp, ${mercenary.stats.attack}% chance to hit`}
    </div>
  </li>;
};

export default memo(MercenaryItem);
