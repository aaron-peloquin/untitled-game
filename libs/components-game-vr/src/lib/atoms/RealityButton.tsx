/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Box, Text} from '@react-three/drei';
import {Interactive, XRInteractionEvent} from '@react-three/xr';

type T_3dDimensions = [width?: number | undefined, height?: number | undefined, depth?: number | undefined, widthSegments?: number | undefined, heightSegments?: number | undefined, depthSegments?: number]

type T_Props = {
  buttonSize?: T_3dDimensions
  buttonColor?: string
  textColor?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelect: (event: XRInteractionEvent) => any
}

const RealityButton: React.FC<T_Props> = ({handleSelect, children}) => {
  return <Interactive onSelect={handleSelect}>
    {/** @ts-ignore */}
    <Box args={[1, .1, .02]} scale={1}>
      <Text position={[0, 0, 0.021]} color={'black'} fontSize={0.08} key={undefined} attach={undefined} args={undefined} onUpdate={undefined} visible={undefined} type={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} material={undefined} geometry={undefined} morphTargetInfluences={undefined} morphTargetDictionary={undefined} isMesh={undefined} updateMorphTargets={undefined}>{children}</Text>
    </Box>
  </Interactive>;
};

RealityButton.displayName = 'RealityButton';

export {RealityButton};
