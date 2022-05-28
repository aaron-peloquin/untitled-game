import {useGrab} from '@helper';
import {Box} from '@react-three/drei';
import {XRInteractionEvent} from '@react-three/xr';
import {useCallback, useRef, useState} from 'react';
import {Mesh} from 'three';
import * as THREE from 'three';

import {RealityText} from './RealityText';

const GrabBox = () => {
  // const draggableGlobalPosition = useRef(new THREE.Vector3());
  const [debugText1, setDebugText1] = useState('Nothing');
  const [debugText2, setDebugText2] = useState('Nothing');
  const boxRef = useRef<Mesh>();

  const onRelease = useCallback((releaseArgs: XRInteractionEvent) => {
    const object = releaseArgs.intersection?.object;
    if (boxRef.current && object) {
      // object.getWorldPosition(draggableGlobalPosition.current);
      boxRef.current.geometry.computeBoundingBox();
      const distanceToPoint = boxRef.current.geometry.boundingBox?.distanceToPoint(object.position) ?? 1;

      setDebugText1(`DIST: ${distanceToPoint}`);
      setDebugText2(distanceToPoint < 0.01 ? 'yay' : 'nay');
    }
  }, []);

  const {ref, isGrabbed} = useGrab(0.075, onRelease);

  return <>
    <RealityText position={[0, .5, -1]} text={debugText1} fontSize={0.5} />
    <RealityText position={[0, .0, -1]} text={debugText2} fontSize={0.5} />

    <Box args={[.1, .1, .1]} position={[0, -0.5, 0]} ref={ref}>
      <meshBasicMaterial color={isGrabbed ? '#E55' : '#E99'} />
    </Box>
    <Box args={[.5, .25, .25]} ref={boxRef}>
      <meshBasicMaterial transparent opacity={0.5} color="blue" />
    </Box>
  </>;
};

GrabBox.displayName = 'GrabBox';
export {GrabBox};
