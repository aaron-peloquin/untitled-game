import {XRInteractionEvent} from '@react-three/xr';
import {MutableRefObject, useCallback} from 'react';
import {Mesh} from 'three';

import {useGrab} from './useGrab';

export const useGrabAndDrop = (refRecieverBox: MutableRefObject<Mesh | undefined>, handleDrop:(distance: number) => void, grabbableDistance?: number) => {
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
