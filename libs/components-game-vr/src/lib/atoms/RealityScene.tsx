import {Stats} from '@react-three/drei';

const RealityScene: React.FC = () => {
  return <>
    <ambientLight intensity={.5} />
    <color attach="background" args={['#133760']} />
    <Stats />
  </>;
};

RealityScene.displayName = 'RealityScene';

export {RealityScene};
