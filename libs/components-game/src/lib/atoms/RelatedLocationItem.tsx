import {Button} from '@components-layout';
import {useBandTravel} from '@datastore';
import {Dispatch, memo, SetStateAction, useCallback} from 'react';
import {T_Location} from 'TS_Location';

type Props = {
    location: T_Location
    setIsTraveling: Dispatch<SetStateAction<boolean>>
}
const RelatedLocationItem: React.FC<Props> = ({location, setIsTraveling}) => {
  const {canAffordTravel, travel, travelCost} = useBandTravel(location);
  const handleTravel = useCallback(() => {
    setIsTraveling(true);
    travel();
    setTimeout(() => {
      setIsTraveling(false);
    }, 7000);
  }, [setIsTraveling, travel]);

  return <>
    <Button onClick={handleTravel} disabled={!canAffordTravel} text="Travel" /> to {location.name}, for {travelCost} gold
  </>;
};

export default memo(RelatedLocationItem);
