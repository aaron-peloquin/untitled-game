import {useGrab} from '@helper';
import {Sphere} from '@react-three/drei';

const GrabBall = () => {
  const {ref, isGrabbed} = useGrab();
  return <Sphere args={[.1, 64, 64]} ref={ref}>
    <meshBasicMaterial color={isGrabbed ? 'red' : 'hotpink'} />
  </Sphere>;
};

GrabBall.displayName = 'GrabBall';
export {GrabBall};
