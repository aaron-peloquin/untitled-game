import {Box} from '@react-three/drei';
import {forwardRef, ReactNode} from 'react';
import {Mesh, Vector3} from 'three';

type Props = {
  args?: [width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number | undefined]
  children?: ReactNode
  color?: string
  position?: Vector3
  transparent?: boolean
  opacity?: number
}

const RealityBox = forwardRef<Mesh | undefined, Props>(({args = [.1, .1, .1], children, color, position, transparent, opacity}, boxRef) => {
  return <Box args={args} position={position} ref={boxRef}>
    <meshBasicMaterial color={color} transparent={transparent} opacity={opacity} />
    {children}
  </Box>;
});

RealityBox.displayName = 'RealityBox';
export {RealityBox};
