import {useGrabAndDrop} from '@helper';
import {Box} from '@react-three/drei';
import {useCallback, useRef, useState} from 'react';
import {Mesh} from 'three';

const GrabBox = () => {
  const [receiverColor, setReceiverColor] = useState('blue');

  const refReceiverBox = useRef<Mesh>();
  const handleDrop = useCallback((distance) => {
    if (distance < 0.01) {
      setReceiverColor('orange');
    } else if (distance > .5) {
      setReceiverColor('purple');
    } else {
      setReceiverColor('navy');
    }
  }, []);
  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(refReceiverBox, handleDrop);

  return <>
    <Box args={[.1, .1, .1]} position={[0, -0.5, 0]} ref={refGrabbableBox}>
      <meshBasicMaterial color={isGrabbed ? '#E55' : '#E99'} />
    </Box>
    <Box args={[.5, .25, .25]} ref={refReceiverBox}>
      <meshBasicMaterial transparent opacity={0.5} color={receiverColor} />
    </Box>
  </>;
};

GrabBox.displayName = 'GrabBox';
export {GrabBox};
