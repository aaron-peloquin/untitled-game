import {useInteraction} from '@react-three/xr';
import {useRef, useState} from 'react';

export const useGrab = (maxDistance = 0.075) => {
  const ref = useRef<any>();
  const refContainer = useRef<any>();
  const [isGrabbed, setIsGrabbed] = useState(false);

  useInteraction(ref, 'onSqueezeStart', ({controller, intersection}) => {
    const controllerApi = controller.controller;
    if (intersection && intersection?.distance <= maxDistance) {
      console.log('intersection.object.parent', intersection.object.parent);
      const objParent = intersection.object.parent;
      if (objParent?.userData?.['name'] !== 'controller') {
        refContainer.current = objParent;
      }
      setIsGrabbed(true);
      controllerApi.attach(intersection.object);
    }
  });

  useInteraction(ref, 'onSqueezeEnd', ({intersection}) => {
    if (refContainer.current && intersection) {
      setIsGrabbed(false);
      refContainer.current.attach(intersection.object);
    }
  });
  return {
    isGrabbed,
    ref,
  };
};
