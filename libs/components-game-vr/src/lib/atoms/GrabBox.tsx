import {useGrab} from '@helper';
import {Bounds, Box} from '@react-three/drei';
import {XRInteractionEvent} from '@react-three/xr';
import {useCallback, useRef} from 'react';
import {Box3} from 'three';

function intersect(a: Box3, b: Box3) {
  console.log({a, b});
  return (a.min.x <= b.max.x && a.max.x >= b.min.x) &&
         (a.min.y <= b.max.y && a.max.y >= b.min.y) &&
         (a.min.z <= b.max.z && a.max.z >= b.min.z);
}
const GrabBox = () => {
  const boxRef = useRef<any>();

  const onRelease = useCallback((releaseArgs: XRInteractionEvent) => {
    const object = releaseArgs.intersection?.object;
    if (boxRef.current && object) {
      console.log('object', object);
      // box.setFromObject(boxRef.current);
      // box.expandByObject
      console.log('set done');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const theyIntersect = intersect(object, boxRef.current);
      if (theyIntersect) {
        console.log('intersectioned!');
      } else {
        console.log('nah bro');
      }
    }
  }, []);


  const {ref, isGrabbed} = useGrab(0.075, onRelease);

  return <>
    <Bounds fit ref={ref}>
      <Box args={[.1, .1, .1]}>
        <meshBasicMaterial color={isGrabbed ? '#E55' : '#E99'} />
      </Box>
    </Bounds>

    <Bounds fit ref={boxRef}>
      <Box args={[.5, .25, .25]} position={[0, -0.5, 0]}>
        <meshBasicMaterial transparent opacity={0.5} color="blue" />
      </Box>
    </Bounds>
  </>;
};

GrabBox.displayName = 'GrabBox';
export {GrabBox};
