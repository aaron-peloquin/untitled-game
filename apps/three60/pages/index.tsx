import React from 'react'
import { VRCanvas, DefaultXRControllers } from '@react-three/xr';

import { ButtonBar } from '../temp/ButtonBar';
import { XrGameLayout } from '../temp/XrGameLayout';

export function Index(props) {
  // Return the view, these are regular Threejs elements expressed in JSX
  return <VRCanvas>
    <DefaultXRControllers rayMaterial={true} />
    <ambientLight />
    <pointLight position={[8, 10, 10]} />
    <XrGameLayout position={[0, 1.0, -.8]} />
    {/* <ButtonBar position={[0, 1.0, -.8]}  /> */}
  </VRCanvas>
}

export default Index;