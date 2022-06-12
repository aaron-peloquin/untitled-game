import {XRInteractionEvent} from '@react-three/xr';
import {MutableRefObject, useCallback} from 'react';
import {Mesh, Vector3} from 'three';

import {useGrab} from './useGrab';

export const useGrabAndDrop = (refReceiverBox: MutableRefObject<Mesh | undefined>, handleDrop:(distance: number) => void, grabbableDistance?: number) => {
  const onRelease = useCallback((releaseArgs: XRInteractionEvent) => {
    const object = releaseArgs.intersection?.object;

    if (refReceiverBox.current && object) {
      refReceiverBox.current.geometry.computeBoundingBox();
      const positions = {obj: new Vector3(0, 0, 0), rec: new Vector3(0, 0, 0)};
      object.getWorldPosition(positions.obj);
      refReceiverBox.current.getWorldPosition(positions.rec);
      const distanceToPoint = positions.rec.distanceTo(positions.obj);

      handleDrop(distanceToPoint);
    }
  }, [handleDrop, refReceiverBox]);

  const {ref: refGrabbableBox, isGrabbed} = useGrab(grabbableDistance, onRelease);
  return {isGrabbed, refGrabbableBox};
};
