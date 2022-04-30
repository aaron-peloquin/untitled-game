import { useRef } from "react"

import { GameLayout } from "@components-game"
import { Html, Billboard, Text } from '@react-three/drei'

export const XrGameLayout = (props) => {
  return <Billboard
    position={[1, 1, -20]}
    follow={true}
    lockX={false}
    lockY={false}
    lockZ={false} // Lock the rotation on the z axis (default=false)
  >
  {/* <Text fontSize={1}>I'm a billboard</Text> */}
    <Html
      position={[0, 0.05, -0.09]}
      transform
      occlude
    >{/* NOPE!  :sad:   The <Html> is for non-XR 3d rendering */}
      <GameLayout /> 
    </Html>
  </Billboard>
//   <Html position={[0, 0.05, -0.09]} transform occlude>
    // <GameLayout />
//   </Html>
}