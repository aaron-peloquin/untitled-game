import {useGrab} from '@helper';
import {Box, Sphere} from '@react-three/drei';
import {XRInteractionEvent} from '@react-three/xr';
import {useCallback, useRef} from 'react';
import * as THREE from 'three';

const box = new THREE.Box3();

const GrabBall = () => {
  // const onCollideBox = useCallback((event) => {
  //   console.log('event', event);
  // }, []);

  const boxRef = useRef();

  const onRelease = useCallback((releaseArgs: XRInteractionEvent) => {
    const object = releaseArgs.intersection?.object;
    if (boxRef.current && object) {
      console.log('object', object);
      box.setFromObject( boxRef.current );
      console.log('set done');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if ( box.intersectsSphere( {...object.geometry.boundingSphere, position: object.position} ) ) {
        console.log('intersectioned!');
      } else {
        console.log('nah bro');
      }
    }
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
