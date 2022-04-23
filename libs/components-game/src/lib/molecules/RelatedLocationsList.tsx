import {GridArea, GridTemplate} from '@components-layout';
import {Dispatch, memo, SetStateAction} from 'react';
import {T_Location} from 'TS_Location';

import RelatedLocationItem from '../atoms/RelatedLocationItem';

type Props = {
    locations: T_Location[]
    setIsTraveling: Dispatch<SetStateAction<boolean>>
}
const RelatedLocationsList: React.FC<Props> = ({locations, setIsTraveling}) => {
  return <GridTemplate rows={1} gridGap="4px">
    {locations.map((location) => <GridArea key={location.locationId}>
      <RelatedLocationItem location={location} setIsTraveling={setIsTraveling} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(RelatedLocationsList);
