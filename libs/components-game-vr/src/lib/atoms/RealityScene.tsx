import {Stats, useGLTF} from '@react-three/drei';
import _ from 'lodash';
import {useRef} from 'react';
import {Mesh} from 'three';

const RealityScene: React.FC = () => {
  const refTavern = useRef<Mesh>();
  const {scene} = useGLTF('/tavern/scene.gltf');

  return <>
    <ambientLight intensity={.5} />
    <primitive ref={refTavern} object={scene} scale={0.25} position={[-2, -1, -1.75]} rotation={[0, 0, 0]} />
    {/* <TestScene /> */}
    {/* <directionalLight
      intensity={0.5}
      castShadow
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
    />
    <Plane args={[100, 100]} position={[0, 35, 0]} rotation={[1.5, 0, 0]}>
      <meshBasicMaterial color="#133760" />
    </Plane>
    <Plane args={[100, 100]} position={[0, -35, 0]} rotation={[-1.5, 0, 0]}>
      <meshBasicMaterial color="#133760" />
    </Plane>
    <Plane args={[100, 100]} position={[0, 0, -35]} rotation={[0, 0, 0]}>
      <meshBasicMaterial color="#133760" />
    </Plane>
    <Plane args={[100, 100]} position={[0, 0, 35]} rotation={[0, 3, 0]}>
      <meshBasicMaterial color="#133760" />
    </Plane>
    <Plane args={[100, 100]} position={[-35, 0, 0]} rotation={[0, 1.5, 0]}>
      <meshBasicMaterial color="#133760" />
    </Plane>
    <Plane args={[100, 100]} position={[35, 0, 0]} rotation={[0, -1.5, 0]}>
      <meshBasicMaterial color="#133760" />
    </Plane>
    <Plane args={[1000, 1000]} position={[20, 0, 0]} />
    <Plane args={[1000, 1000]} position={[20, 0, 0]} /> */}
    <color attach="background" args={['#133760']} />
    <Stats />
  </>;
};

RealityScene.displayName = 'RealityScene';

export {RealityScene};
