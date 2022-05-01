import {Text} from '@react-three/drei';
import { ReactThreeFiber } from '@react-three/fiber';

type T_Props = {
    text?: string
    fontSize?: number
    color?: ReactThreeFiber.Color
    [passThrough: string]: any
}
const RealityText: React.FC<T_Props> = ({text, fontSize = .5, ...props}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Text fontSize={fontSize} {...props}>{text}</Text>;
};

RealityText.displayName = 'RealityText';
export {RealityText};
