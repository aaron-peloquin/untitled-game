import {useGetBand, useGetLocation, useListLocationsById} from '@datastore';

import {RealityTravelLocationItem} from '../molecules/RealityTravelLocationItem';

const RealityTravel: React.FC = () => {
  const band = useGetBand();
  const currentLocation = useGetLocation(band?.currentLocationId);
  const relatedLocations = useListLocationsById(currentLocation?.relatedLocationIds);

  return <group>
    <group position={[0.05, -0.15, 0]}>
      {relatedLocations?.map((location, index) => <RealityTravelLocationItem
        key={location.locationId}
        location={location}
        offset={index}
        offsetModifier={-0.2}
      />)}
    </group>
  </group>;
};


RealityTravel.displayName = 'RealityTravel';
export {RealityTravel};
