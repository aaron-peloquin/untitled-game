import React from 'react'
import { VRCanvas, DefaultXRControllers } from '@react-three/xr';
// import { useFrame } from '@react-three/fiber'

export function Index(props) {
  // This reference gives us direct access to the THREE.Mesh object
  // const ref = useRef({rotation: {x: 0, z: 0, y:0}})

  // Hold state for hovered and clicked events
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {
  //   ref.current.rotation.x += 0.01;
  //   ref.current.rotation.z += 0.02;
  //   ref.current.rotation.y += 0.04;
  // })
  // Return the view, these are regular Threejs elements expressed in JSX
  return <VRCanvas>
    <DefaultXRControllers />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
  </VRCanvas>
}


export default Index;
