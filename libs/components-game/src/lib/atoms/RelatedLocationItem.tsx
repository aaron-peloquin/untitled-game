import {Button} from '@components-layout';
import {useBandTravel} from '@datastore';
import {Dispatch, memo, SetStateAction, useCallback} from 'react';
import {T_Location} from 'TS_Location';

type Props = {
    location: T_Location
    setIsTraveling: Dispatch<SetStateAction<boolean>>
}

const RelatedLocationItem: React.FC<Props> = ({location, setIsTraveling}) => {
  const {apCost, canAffordTravel, hasEnoughAp, travel, travelCost} = useBandTravel(location);
  const handleTravel = useCallback(() => {
    const animationDuration = Math.sqrt(travelCost) * 2000;
    setIsTraveling(true);
    travel();

    setTimeout(() => {
      setIsTraveling(false);
    }, animationDuration);
  }, [setIsTraveling, travel, travelCost]);

  return <>
    <Button onClick={handleTravel} disabled={!canAffordTravel || !hasEnoughAp} text={`Travel (${travelCost} gold, ${apCost} AP)`} /> to {location.name} (lvl: {location.level})
  </>;
};

export default memo(RelatedLocationItem);
