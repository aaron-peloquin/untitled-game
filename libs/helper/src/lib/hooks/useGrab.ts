import {useThree} from '@react-three/fiber';
import {useInteraction} from '@react-three/xr';
import {MutableRefObject, useRef, useState} from 'react';

type useGrabSig = (maxDistance?: number, dropTargets?: any[]) => {isGrabbed: boolean, ref: MutableRefObject<any>}

export const useGrab: useGrabSig = (maxDistance = 0.075, dropTargets) => {
  const three = useThree();
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
      if (dropTargets?.length) {
        dropTargets.forEach(({ref, callback}) => {
          // const ray = three.raycaster.set(intersection.object.getWorldPosition());
          // const result = three.raycaster.intersectObject(intersection.object, false, ref);

          console.log('ref', ref.current);
          three.raycaster.set(intersection.object.position, ref.current.position);
          const dist = three.raycaster.intersectObject(ref.current.position);
          console.log('dist', dist);
          // const result = intersection.object.raycast(three.raycaster, ref.current).intersectObject(intersection.object);
          // console.log('result', result);
          // intersection.object.raycast;
          // dropTargets[0](intersection);
        });
      }
      setIsGrabbed(false);
      refContainer.current.attach(intersection.object);
    }
  });
  return {
    isGrabbed,
    ref,
  };
};
