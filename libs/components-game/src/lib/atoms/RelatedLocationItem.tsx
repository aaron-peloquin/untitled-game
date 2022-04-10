import {useBandTravel, useGetBand} from '@datastore';
import {db, useCurrentSave} from '@helper';
import {memo, useCallback} from 'react';
import {T_Location} from 'TS_Location';

type Props = {
    location: T_Location
}
const RelatedLocationItem: React.FC<Props> = ({location}) => {
  const {canAffordTravel, travel, travelCost} = useBandTravel(location);

  return <>
    <button onClick={travel} disabled={!canAffordTravel}>Travel</button> to {location.name}, for {travelCost} gold
  </>;
};

export default memo(RelatedLocationItem);
