import {Cone} from '@react-three/drei';
import {forwardRef} from 'react';
import {Euler, Vector3} from 'three';

import {RealityBox} from './RealityBox';

type Props = {
  color?: string
  position?: Vector3
  rotation?: Euler
}

const RealityArrow = forwardRef<any, Props>(({color = 'green', position, rotation}, ref) => {
  return <group position={position} rotation={rotation}>
    <RealityBox ref={ref} args={[0.1, 0.025, 0.025]} color={color} />
    <Cone args={[0.025, 0.05]} rotation={[0, 0, -Math.PI / 2]} position={[.08, 0, 0]}>
      <meshBasicMaterial color={color} />
    </Cone>
  </group>;
});

RealityArrow.displayName = 'RealityArrow';
export {RealityArrow};
