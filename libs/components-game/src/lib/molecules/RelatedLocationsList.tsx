import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Location} from 'TS_Location';

import RelatedLocationItem from '../atoms/RelatedLocationItem';

type Props = {
    locations: T_Location[]
}
const RelatedLocationsList: React.FC<Props> = ({locations}) => {
  return <GridTemplate columns={1}>
    {locations.map((location) => <GridArea key={location.id}>
      <RelatedLocationItem location={location} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(RelatedLocationsList);
