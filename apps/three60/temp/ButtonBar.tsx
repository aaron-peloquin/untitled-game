import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useController, Interactive } from "@react-three/xr"

import { Box, Text } from '@react-three/drei'

export const ButtonBar = (props) => {
    const leftController = useController('left')
    console.log({leftController})
    const [hover, setHover] = useState(false)
    const [color, setColor] = useState(0x123456)
  
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef({rotation: {x: 0, z: 0, y:0}})
  
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      console.log({state, delta})
      if(hover) {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.z += 0.02;
        ref.current.rotation.y += 0.04;
      }
    })
  
    return (
      <Interactive onSelect={() => setColor((Math.random() * 0xffffff) | 0)} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
        <Box ref={ref} scale={[1, 1, 1]} args={[0.4, 0.1, 0.1]} {...props}>
          <meshStandardMaterial attach="material" color={color} />
            <Text
              position={[0, 0.0, 0.051]}
              fontSize={0.05}
              color="#888"
              anchorX="center"
              anchorY="middle"
              key="my-text-key"
              attach={undefined}
              args={undefined}
              onUpdate={undefined}
              visible={undefined}
              type={undefined}
              id={undefined}
              uuid={undefined}
              name={undefined}
              parent={undefined}
              modelViewMatrix={undefined}
              normalMatrix={undefined}
              matrixWorld={undefined}
              matrixAutoUpdate={undefined}
              matrixWorldNeedsUpdate={undefined}
              castShadow={undefined}
              receiveShadow={undefined}
              frustumCulled={undefined}
              renderOrder={undefined}
              animations={undefined}
              userData={undefined}
              customDepthMaterial={undefined}
              customDistanceMaterial={undefined}
              isObject3D={undefined}
              onBeforeRender={undefined}
              onAfterRender={undefined}
              applyMatrix4={undefined}
              applyQuaternion={undefined}
              setRotationFromAxisAngle={undefined}
              setRotationFromEuler={undefined}
              setRotationFromMatrix={undefined}
              setRotationFromQuaternion={undefined}
              rotateOnAxis={undefined}
              rotateOnWorldAxis={undefined}
              rotateX={undefined}
              rotateY={undefined}
              rotateZ={undefined}
              translateOnAxis={undefined}
              translateX={undefined}
              translateY={undefined}
              translateZ={undefined}
              localToWorld={undefined}
              worldToLocal={undefined}
              lookAt={undefined}
              add={undefined}
              remove={undefined}
              removeFromParent={undefined}
              clear={undefined}
              getObjectById={undefined}
              getObjectByName={undefined}
              getObjectByProperty={undefined}
              getWorldPosition={undefined}
              getWorldQuaternion={undefined}
              getWorldScale={undefined}
              getWorldDirection={undefined}
              raycast={undefined}
              traverse={undefined}
              traverseVisible={undefined}
              traverseAncestors={undefined}
              updateMatrix={undefined}
              updateMatrixWorld={undefined}
              updateWorldMatrix={undefined}
              toJSON={undefined}
              clone={undefined}
              copy={undefined}
              addEventListener={undefined}
              hasEventListener={undefined}
              removeEventListener={undefined}
              dispatchEvent={undefined}
              material={undefined}
              geometry={undefined}
              morphTargetInfluences={undefined}
              morphTargetDictionary={undefined}
              isMesh={undefined}
              updateMorphTargets={undefined}
            >
             Hello react-xr!
            </Text>
        </Box>
      </Interactive>
    )
  }