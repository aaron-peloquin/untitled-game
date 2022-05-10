import {useGrab} from '@helper';
import {Box, Sphere} from '@react-three/drei';
import {useCallback, useMemo, useRef} from 'react';


const GrabBall = () => {
  const boxRef = useRef();
  const dropTargetCallback = useCallback((intersection) => {
    console.log('intersection', intersection);
  }, []);
  const dropTargets = useMemo(() => ([{callback: dropTargetCallback, ref: boxRef}]), [dropTargetCallback]);
  const {ref, isGrabbed} = useGrab(0.075, dropTargets);

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
