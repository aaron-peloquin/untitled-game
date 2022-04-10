import {db, useCurrentSave} from '@helper';
import {memo, useCallback} from 'react';
import {T_Location} from 'TS_Location';

type Props = {
    location: T_Location
}
const RelatedLocationItem: React.FC<Props> = ({location}) => {
  // const gameSave = useCurrentSave();
  // const travelCost = Math.round(location.level * 1.5);
  // const canAffordTravel = (gameSave?.band.gold || 0) >= travelCost;
  const handleLocationSelect = useCallback(() => {
    return;
  //   if (gameSave?.id) {
  //     // reduce gold
  //     const newGoldValue = gameSave?.band.gold - travelCost;
  //     db.gameSaves.update(gameSave?.id, {'band.gold': newGoldValue});
  //     db.gameSaves.update(gameSave?.id, {currentLocation: location.id});
  //   }
  }, []);
  const travelCost = 0;

  return <li>
    <button onClick={handleLocationSelect} disabled={true}>Travel</button> to {location.name}, for {travelCost} gold
  </li>;
};

export default memo(RelatedLocationItem);
