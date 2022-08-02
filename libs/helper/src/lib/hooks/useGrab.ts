import {useInteraction, XRInteractionEvent} from '@react-three/xr';
import {MutableRefObject, useRef, useState} from 'react';

type useGrabSig = (maxDistance?: number, onRelease?: (onReleaseArgs: XRInteractionEvent) => void, onGrab?: (onGrabArgs:XRInteractionEvent) => void) => {isGrabbed: boolean, ref: MutableRefObject<any>}

export const useGrab: useGrabSig = (maxDistance = 0.075, onRelease, onGrab) => {
  const ref = useRef<any>();
  const refContainer = useRef<any>();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const clickAudio = new Audio('/sfx/mixkit-interface-click-1126.mp3');

  useInteraction(ref, 'onSqueezeStart', (onGrabArgs) => {
    const {controller, intersection} = onGrabArgs;
    const controllerApi = controller.controller;
    if (intersection && intersection?.distance <= maxDistance) {
      clickAudio.play();
      let obj = intersection.object;
      while (obj !== ref.current && obj.parent) {
        obj = obj.parent;
      }
      if (obj) {
        const objParent = obj.parent;
        if (objParent?.userData?.['name'] !== 'controller') {
          refContainer.current = objParent;
        }
        setIsGrabbed(true);
        if (onGrab) {
          onGrab(onGrabArgs);
        }
        controllerApi.attach(obj);
      }
    }
  });

  useInteraction(ref, 'onSqueezeEnd', (onReleaseArgs) => {
    const {intersection} = onReleaseArgs;
    if (refContainer.current && intersection) {
      setIsGrabbed(false);
      let obj = intersection.object;
      while (obj !== ref.current && obj.parent) {
        obj = obj.parent;
      }
      if (obj) {
        refContainer.current.attach(obj);
        clickAudio.play();
        if (onRelease) {
          onRelease(onReleaseArgs);
        }
      }
    }
  });
  return {
    isGrabbed,
    ref,
  };
};
