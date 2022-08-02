import {useGetInspectingMercenary} from '@datastore';
import {useMemo} from 'react';
import {Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

const RealityMercenaryInspect = () => {
  const {mercenary, mercenaryStats} = useGetInspectingMercenary();
  const positions = useMemo(() => ({
    lowerLeft: new Vector3(-0.9, -0.4, 0.075),
    lowerRight: new Vector3(0.9, -0.4, 0.075),
    upperLeft: new Vector3(-0.9, 0.25, 0.075),
    upperRight: new Vector3(0.9, 0.25, 0.075),
  }), []);

  return mercenary ? <RealityBox args={[4, 2, 0.1]}>
    <meshBasicMaterial color="grey" />
    <RealityText fontSize={.35} text={`Inspecting ${mercenary?.name}`} position={[0, 0.75, 0.075]} />
    {mercenary && <>
      <RealityBox args={[1.75, .5, 0.01]} position={positions.upperLeft}>
        <meshBasicMaterial color="darkgrey" />
        <RealityText fontSize={.25} color="black" text={`${mercenaryStats.attack} Attack`} position={[0, 0, .1]} />
      </RealityBox>
      <RealityBox args={[1.75, .5, 0.01]} position={positions.upperRight}>
        <meshBasicMaterial color="darkgrey" />
        <RealityText fontSize={.25} color="black" text={`${mercenaryStats.subtlety} Subtlety`} position={[0, 0, .1]} />
      </RealityBox>
      <RealityBox args={[1.75, .5, 0.01]} position={positions.lowerLeft}>
        <meshBasicMaterial color="darkgrey" />
        <RealityText fontSize={.25} color="black" text={`${mercenaryStats.cunning} Cunning`} position={[0, 0, .1]} />
      </RealityBox>
      <RealityBox args={[1.75, .5, 0.01]} position={positions.lowerRight}>
        <meshBasicMaterial color="darkgrey" />
        <RealityText fontSize={.25} color="black" text={`${mercenaryStats.endurance} Endurance`} position={[0, 0, .1]} />
      </RealityBox>
    </>}
  </RealityBox> : null;
};

RealityMercenaryInspect.displayName = 'RealityMercenaryInspect';
export {RealityMercenaryInspect};
