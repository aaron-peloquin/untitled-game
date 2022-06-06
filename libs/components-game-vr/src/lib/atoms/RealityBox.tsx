import {Box} from '@react-three/drei';
import {forwardRef} from 'react';
import {Mesh, Vector3} from 'three';

type Props = {
  args?: [width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number | undefined]
  position?: Vector3
  color?: string
}

const RealityBox = forwardRef<Mesh | undefined, Props>(({args = [.1, .1, .1], color, position}, boxRef) => {
  return <Box args={args} position={position} ref={boxRef}>
    <meshBasicMaterial color={color} />
  </Box>;
});

RealityBox.displayName = 'RealityBox';
export {RealityBox};
