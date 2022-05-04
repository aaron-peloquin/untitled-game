import {OrbitControls, Sphere} from '@react-three/drei';
import {RayGrab, useController, useInteraction} from '@react-three/xr';
import {useRef} from 'react';

const GrabBall = () => {
  const refBall = useRef();
  // const left = useController('left');
  useInteraction(refBall, 'onSqueeze', ({controller, intersection}) => {
    const controllerPos = controller.controller.position;
    console.log({controllerPos});
    intersection?.object.position.set(controllerPos.x, controllerPos.y, controllerPos.z);
  });
  // console.log({left});
  // Load texture (the black plus sign)
  // Make the ball a physics object with a low mass
  return (<>
    {/* <Plane args={[2, 2]} /> */}
    {/* <RayGrab> */}
    <Sphere args={[.1, 64, 64]} ref={refBall}>
      <meshBasicMaterial color="hotpink" />
    </Sphere>
    {/* </RayGrab> */}
    {/* <OrbitControls /> */}
  </>);
};

GrabBall.displayName = 'GrabBall';
export {GrabBall};
