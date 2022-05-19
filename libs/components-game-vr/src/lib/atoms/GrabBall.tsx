import {useGrab} from '@helper';
import {useBox, useSphere} from '@react-three/cannon';
import {Box, Sphere} from '@react-three/drei';
import {useCallback, useMemo, useRef, useState} from 'react';


const GrabBall = () => {
  const onCollideBox = useCallback((event) => {
    console.log('event', event);
  }, []);

  const [boxRef, api] = useBox(() => ({args: [.5, .25, .25], onCollide: onCollideBox, type: 'Kinematic'}));
  const [mass, setMass] = useState(0);
  const onRelease = useCallback(() => {
    setMass(0.0000000000000000001);
  }, []);
  const onGrab = useCallback(() => {
    setMass(0);
  }, []);
  const {ref, isGrabbed} = useGrab(0.075, onRelease, onGrab);
  const [ballRef] = useSphere(() => ({args: [0.1], mass}), ref, [mass]);

  return <>
    <Sphere args={[.1, 64, 64]} ref={ballRef}>
      <meshBasicMaterial color={isGrabbed ? '#E55' : '#E99'} />
    </Sphere>
    <Box args={[.5, .25, .25]} position={[0, -0.5, 0]} ref={boxRef}>
      <meshBasicMaterial transparent opacity={0.5} color="blue" />
    </Box>
  </>;
};

GrabBall.displayName = 'GrabBall';
export {GrabBall};
