/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Plane, Sky, Stars} from '@react-three/drei';

const RealityScene: React.FC = () => {
  return <>
    <ambientLight intensity={.5} />
    {/* <Sky sunPosition={[25, 10, 0]} /> */}
    <Stars />
    {/** @ts-ignore */}
    {/* <Plane args={[100, 100]} position={[0, -10, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <meshLambertMaterial color="blue" />
    </Plane> */}
  </>;
};

RealityScene.displayName = 'RealityScene';

export {RealityScene};
