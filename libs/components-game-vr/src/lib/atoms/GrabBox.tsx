import {useGrab} from '@helper';
import {Box} from '@react-three/drei';
import {XRInteractionEvent} from '@react-three/xr';
import {MutableRefObject, useCallback, useRef, useState} from 'react';
import {Mesh} from 'three';
import * as THREE from 'three';

import {RealityText} from './RealityText';


const useGrabAndDrop = (refRecieverBox: MutableRefObject<Mesh | undefined>, handleDrop:(distance: number) => void, grabbableDistance?: number) => {
  const onRelease = useCallback((releaseArgs: XRInteractionEvent) => {
    const object = releaseArgs.intersection?.object;

    if (refRecieverBox.current && object) {
      refRecieverBox.current.geometry.computeBoundingBox();
      const distanceToPoint = refRecieverBox.current.geometry.boundingBox?.distanceToPoint(object.position) ?? 1;

      handleDrop(distanceToPoint);
    }
  }, [handleDrop, refRecieverBox]);

  const {ref: refGrabbableBox, isGrabbed} = useGrab(grabbableDistance, onRelease);
  return {isGrabbed, refGrabbableBox};
};

const GrabBox = () => {
  const [recieverColor, setRecieverColor] = useState('blue');

  const refRecieverBox = useRef<Mesh>();
  const handleDrop = useCallback((distance) => {
    if (distance < 0.01) {
      setRecieverColor('orange');
    } else if (distance > .5) {
      setRecieverColor('purple');
    } else {
      setRecieverColor('navy');
    }
  }, []);
  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(refRecieverBox, handleDrop);

  return <>
    <Box args={[.1, .1, .1]} position={[0, -0.5, 0]} ref={refGrabbableBox}>
      <meshBasicMaterial color={isGrabbed ? '#E55' : '#E99'} />
    </Box>
    <Box args={[.5, .25, .25]} ref={refRecieverBox}>
      <meshBasicMaterial transparent opacity={0.5} color={recieverColor} />
    </Box>
  </>;
};

GrabBox.displayName = 'GrabBox';
export {GrabBox};
