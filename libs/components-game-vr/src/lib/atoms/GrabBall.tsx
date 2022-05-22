import {useGrab} from '@helper';
import {Box, Sphere} from '@react-three/drei';
import {useCallback} from 'react';


const GrabBall = () => {
  // const onCollideBox = useCallback((event) => {
  //   console.log('event', event);
  // }, []);


  const onRelease = useCallback((event) => {
    console.log('event', event);
  }, []);


  const {ref, isGrabbed} = useGrab(0.075, onRelease);

  return <>
    <Sphere args={[.1, 64, 64]} ref={ref}>
      <meshBasicMaterial color={isGrabbed ? '#E55' : '#E99'} />
    </Sphere>
    <Box args={[.5, .25, .25]} position={[0, -0.5, 0]} ref={boxRef}>
      <meshBasicMaterial transparent opacity={0.5} color="blue" />
    </Box>
  </>;
};

GrabBall.displayName = 'GrabBall';
export {GrabBall};
