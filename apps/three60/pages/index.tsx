import React, { useRef, useState } from 'react'
import { VRCanvas, DefaultXRControllers, Interactive, useController } from '@react-three/xr';

import { ButtonBar } from '../temp/ButtonBar';

export function Index(props) {
  // Hold state for hovered and clicked events
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)

  // Return the view, these are regular Threejs elements expressed in JSX
  return <VRCanvas>
    <DefaultXRControllers rayMaterial={true} />
    <ambientLight />
    <pointLight position={[8, 10, 10]} />
    <ButtonBar position={[0, 1.0, -.8]}  />
  </VRCanvas>
}

export default Index;
