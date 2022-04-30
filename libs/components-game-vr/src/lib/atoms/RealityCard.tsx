import {Backdrop, Billboard, Environment, Plane, Text} from '@react-three/drei';
import {T_CardLayer} from 'TS_General';

type T_Props = {
  layer: T_CardLayer
  heading?: string
}

const RealityCard: React.FC<T_Props> = ({children, heading}) => {
  console.log({heading});
  return <Billboard>
    {/* <Plane scale={[8, 1, 1]} position={[0,0,-.01]} /> */}
    {/* <Plane> */}
    {heading ? <Text fontSize={.75} color="green">{heading}</Text> : null}
    {children}
    {/* </Plane> */}
  </Billboard>;
};

RealityCard.displayName = 'RealityCard';

export {RealityCard};
