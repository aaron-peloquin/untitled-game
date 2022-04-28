// import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export function Index(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef({rotation: {x: 0}})
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh
        position={[1.2, 0, 0]}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={() => click(!clicked)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}>
        <boxGeometry args={[1, 1, 1]}
      />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
  </>
}


export default Index;
