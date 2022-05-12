import {useInteraction} from '@react-three/xr';
import {MutableRefObject, useRef, useState} from 'react';

type useGrabSig = (maxDistance?: number, dropTargets?: any[]) => {isGrabbed: boolean, ref: MutableRefObject<any>}

export const useGrab: useGrabSig = (maxDistance = 0.075, dropTargets) => {
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

  setTimeout(() => {
    console.log('intersect', ref.current);
  }, 500);

  useInteraction(ref, 'onSqueezeEnd', ({intersection}) => {
    if (refContainer.current && intersection) {
      if (dropTargets?.length) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const grabbedBounding = intersection.object.geometry.type !== 'BoxGeometry' ? intersection.object.geometry.boundingBox.intersectsBox : intersection.object.geometry.boundingSphere.intersectsSphere;

        dropTargets.forEach(({ref, callback}) => {
          const refIsBox = ref.current.geometry.type === 'BoxGeometry';
          const refIsSphere = ref.current.geometry.type === 'SphereGeometry';

          // if (intersection.object.geometry?.boundingBox) {
          //   const ab = intersection.object.geometry?.boundingBox?.intersectsBox(ref.current.geometry.boundingBox);
          //   console.log({ab});
          // }
          // if (intersection.object.geometry?.boundingBox) {
          //   const cd = intersection.object.geometry?.boundingBox?.intersectsSphere(ref.current.geometry.boundingSphere);
          //   console.log({cd});
          // }
          // if (intersection.object.geometry?.boundingSphere) {
          //   const gh = intersection.object.geometry?.boundingSphere?.intersectsBox(ref.current?.geometry?.boundingBox);
          //   console.log({gh});
          // }
          // if (intersection.object.geometry?.boundingSphere) {
          //   const ef = intersection.object.geometry?.boundingSphere?.intersectsBox(ref.current?.geometry.boundingSphere);
          //   console.log({ef});
          // }

          // const isIntersecting = ref.current?.geometry?.boundingBox?.intersectsSphere(intersection.object.geometry?.boundingSphere);

          // let isIntersecting = false;
          // if (refIsBox) {
          //   isIntersecting = grabbedBounding?.intersectsBox(ref.current.geometry.boundingBox);
          // } else if (refIsSphere) {
          //   isIntersecting = grabbedBounding?.intersectsSphere(ref.current.geometry.boundingSphere);
          // }

          console.log('isIntersecting', isIntersecting);
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
