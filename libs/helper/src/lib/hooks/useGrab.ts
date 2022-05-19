import {useInteraction} from '@react-three/xr';
import {MutableRefObject, useRef, useState} from 'react';

type useGrabSig = (maxDistance?: number) => {isGrabbed: boolean, ref: MutableRefObject<any>}

export const useGrab: useGrabSig = (maxDistance = 0.075) => {
  const ref = useRef<any>();
  const refContainer = useRef<any>();
  const [isGrabbed, setIsGrabbed] = useState(false);

  useInteraction(ref, 'onSqueezeStart', ({controller, intersection}) => {
    const controllerApi = controller.controller;
    if (intersection && intersection?.distance <= maxDistance) {
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
