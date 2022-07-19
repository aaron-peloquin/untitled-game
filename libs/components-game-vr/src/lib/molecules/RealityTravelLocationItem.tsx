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
  const {apCost, travelCost, canAffordTravel, hasEnoughAp, travel} = useBandTravel(location);

  const planePosition = useMemo(() => new Vector3(0, 0.03, -0.041), []);
  const boxPosition = useMemo(() => {
    return new Vector3(0, offsetModifier * offset, 0);
  }, [offset, offsetModifier]);

  return <group position={boxPosition}>
    <Plane args={[.25, .15, 1]} position={planePosition}>
      <meshBasicMaterial color="navy" />
    </Plane>
    <group position={[0, 0, 0.001]}>
      <RealityText fontSize={.05} text={location.name} position={[0, 0.08, -0.041]} />
      <RealityText fontSize={.025} text={`Cost: ${apCost} AP, ${travelCost} Gold`} position={[0, 0.045, -0.041]} />
      {(hasEnoughAp && canAffordTravel) && <RealityButton fontSize={0.05} handleSelect={travel} text="Travel" />}
    </group>
  </group>;
};

RealityTravelLocationItem.displayName = 'RealityTravelLocationItem';
export {RealityTravelLocationItem};
