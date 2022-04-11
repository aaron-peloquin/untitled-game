import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Location} from 'TS_Location';

import RelatedLocationItem from '../atoms/RelatedLocationItem';

type Props = {
    locations: T_Location[]
}
const RelatedLocationsList: React.FC<Props> = ({locations}) => {
  return <GridTemplate rows={1} gridGap="4px">
    {locations.map((location) => <GridArea key={location.locationId}>
      <RelatedLocationItem location={location} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(RelatedLocationsList);
