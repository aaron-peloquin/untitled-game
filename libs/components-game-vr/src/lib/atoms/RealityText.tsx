import {Text} from '@react-three/drei';
import {ReactThreeFiber} from '@react-three/fiber';
import {forwardRef} from 'react';

export type T_Props = {
    text?: string
    fontSize?: number
    color?: ReactThreeFiber.Color
    textAlign?: 'left' | 'right' | 'center' | 'justify'
    font?: string
  }
const RealityText = forwardRef<any, T_Props>(({text, fontSize = .5, ...props}, ref) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Text ref={ref} fontSize={fontSize} {...props}>{text}</Text>;
});

RealityText.displayName = 'RealityText';
export {RealityText};
