import {Button} from '@components-layout';
import {useBandTravel} from '@datastore';
import {memo} from 'react';
import {T_Location} from 'TS_Location';

type Props = {
    location: T_Location
}
const RelatedLocationItem: React.FC<Props> = ({location}) => {
  const {canAffordTravel, travel, travelCost} = useBandTravel(location);

  return <>
    <Button onClick={travel} disabled={!canAffordTravel} text="Travel" /> to {location.name}, for {travelCost} gold
  </>;
};

export default memo(RelatedLocationItem);
