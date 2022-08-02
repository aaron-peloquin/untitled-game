import {Text} from '@react-three/drei';
import {ReactThreeFiber} from '@react-three/fiber';
import {forwardRef} from 'react';
import {Mesh} from 'three';

export type T_Props = {
    text?: string
    fontSize?: number
    color?: ReactThreeFiber.Color
    textAlign?: 'left' | 'right' | 'center' | 'justify'
    font?: string
    position?: ReactThreeFiber.Vector3
  }
const RealityText = forwardRef<Mesh, T_Props>(({text, fontSize = .5, ...props}, ref) => {
  return <Text ref={ref} fontSize={fontSize} {...props}>{text}</Text>;
});

RealityText.displayName = 'RealityText';
export {RealityText};
