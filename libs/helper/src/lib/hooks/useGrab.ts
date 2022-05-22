import {useInteraction, XRInteractionEvent} from '@react-three/xr';
import {MutableRefObject, useRef, useState} from 'react';

type useGrabSig = (maxDistance?: number, onRelease?: (onReleaseArgs: XRInteractionEvent) => void, onGrab?: (onGrabArgs:XRInteractionEvent) => void) => {isGrabbed: boolean, ref: MutableRefObject<any>}

export const useGrab: useGrabSig = (maxDistance = 0.075, onRelease, onGrab) => {
  const ref = useRef<any>();
  const refContainer = useRef<any>();
  const [isGrabbed, setIsGrabbed] = useState(false);

  useInteraction(ref, 'onSqueezeStart', (onGrabArgs) => {
    const {controller, intersection} = onGrabArgs;
    const controllerApi = controller.controller;
    if (intersection && intersection?.distance <= maxDistance) {
      const objParent = intersection.object.parent;
      if (objParent?.userData?.['name'] !== 'controller') {
        refContainer.current = objParent;
      }
      setIsGrabbed(true);
      if (onGrab) {
        onGrab(onGrabArgs);
      }
      controllerApi.attach(intersection.object);
    }
  });

  useInteraction(ref, 'onSqueezeEnd', (onReleaseArgs) => {
    const {intersection} = onReleaseArgs;
    if (refContainer.current && intersection) {
      setIsGrabbed(false);
      refContainer.current.attach(intersection.object);
      if (onRelease) {
        onRelease(onReleaseArgs);
      }
    }
  });
  return {
    isGrabbed,
    ref,
  };
};
