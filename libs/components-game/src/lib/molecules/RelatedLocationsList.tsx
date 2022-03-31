import {memo} from 'react';
import {T_Location} from 'TS_Location';

import RelatedLocationItem from '../atoms/RelatedLocationItem';

type Props = {
    locations: T_Location[]
}
const RelatedLocationsList: React.FC<Props> = ({locations}) => {
  return <ul>
    {locations.map((location) => <RelatedLocationItem location={location} />)}
  </ul>;
};

export default memo(RelatedLocationsList);
