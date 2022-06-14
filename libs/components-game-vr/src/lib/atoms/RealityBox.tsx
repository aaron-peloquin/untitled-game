import {RoundedBox} from '@react-three/drei';
import {forwardRef, ReactNode} from 'react';
import {Vector3} from 'three';

type Props = {
  args?: [width?: number | undefined, height?: number | undefined, depth?: number | undefined]
  children?: ReactNode
  color?: string
  position?: Vector3
  transparent?: boolean
  opacity?: number
}

const RealityBox = forwardRef<any, Props>(({args = [.1, .1, .1], children, color, position, transparent, opacity}, boxRef) => {
  return <RoundedBox radius={0.005} args={args} position={position} ref={boxRef}>
    <meshBasicMaterial color={color} transparent={transparent} opacity={opacity} />
    {children}
  </RoundedBox>;
});

RealityBox.displayName = 'RealityBox';
export {RealityBox};
