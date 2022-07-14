import {useBandTravel} from '@datastore';
import {Plane} from '@react-three/drei';
import {MutableRefObject, useMemo} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Location} from 'TS_Location';

import {RealityButton} from '../atoms/RealityButton';
import {RealityText} from '../atoms/RealityText';

type Props = {
  location: T_Location
  offset: number
  offsetModifier: number
  refTravelLocationBox?: MutableRefObject<Mesh | undefined>
}

const RealityTravelLocationItem: React.FC<Props> = ({location, offset, offsetModifier}) => {
  const travelBag = useBandTravel(location);

  const planePosition = useMemo(() => new Vector3(0, 0, -0.05), []);
  const boxPosition = useMemo(() => {
    const offsetRow = offset;
    const offsetColumn = 0;
    return new Vector3(offsetModifier * offsetColumn, offsetModifier * offsetRow, 0);
  }, [offset, offsetModifier]);

  return <group position={boxPosition}>
    <Plane args={[.25, .1, 1]} position={planePosition} />
    <group position={[0, 0, 0.001]}>
      <RealityText fontSize={.05} text={location.name} position={[0, 0.05, 0]} />
      <RealityButton fontSize={0.05} handleSelect={travelBag.travel} text="Travel" />;
    </group>
  </group>;
};

RealityTravelLocationItem.displayName = 'RealityTravelLocationItem';
export {RealityTravelLocationItem};
