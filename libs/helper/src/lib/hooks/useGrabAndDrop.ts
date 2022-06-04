import {XRInteractionEvent} from '@react-three/xr';
import {MutableRefObject, useCallback} from 'react';
import {Mesh} from 'three';

import {useGrab} from './useGrab';

export const useGrabAndDrop = (refReceiverBox: MutableRefObject<Mesh | undefined>, handleDrop:(distance: number) => void, grabbableDistance?: number) => {
  const onRelease = useCallback((releaseArgs: XRInteractionEvent) => {
    const object = releaseArgs.intersection?.object;

    if (refReceiverBox.current && object) {
      refReceiverBox.current.geometry.computeBoundingBox();
      const distanceToPoint = refReceiverBox.current.geometry.boundingBox?.distanceToPoint(object.position) ?? 1;

      handleDrop(distanceToPoint);
    }
  }, [handleDrop, refReceiverBox]);

  const {ref: refGrabbableBox, isGrabbed} = useGrab(grabbableDistance, onRelease);
  return {isGrabbed, refGrabbableBox};
};
