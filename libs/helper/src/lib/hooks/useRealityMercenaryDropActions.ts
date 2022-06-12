import {MutableRefObject, useCallback, useMemo} from 'react';
import {Mesh} from 'three';

import {useGrabAndDrop} from './useGrabAndDrop';

export const useRealityMercenaryDropActions = (
    refSelectMercenaryBox:MutableRefObject<Mesh | undefined>,
    refInspectMercenaryBox:MutableRefObject<Mesh | undefined>,
    setSelected: (unset?: boolean | undefined) => void,
    setInspect: (unset?: boolean | undefined) => void,
    isSelected: boolean,
    isInspecting: boolean,
) => {
  const handleInspect = useCallback((distance) => {
    if (distance <= .15) {
      setInspect();
    } else if (isInspecting) {
      setInspect(true);
    }
  }, [isInspecting, setInspect]);

  const handleSelect = useCallback((distance) => {
    if (distance <= .15) {
      setSelected();
    } else if (isSelected) {
      setSelected(true);
    }
  }, [isSelected, setSelected]);

  const dropTargets = useMemo(() => ([
    {handleDrop: handleInspect, refReceiverBox: refInspectMercenaryBox},
    {handleDrop: handleSelect, refReceiverBox: refSelectMercenaryBox},
  ]), [handleInspect, handleSelect, refInspectMercenaryBox, refSelectMercenaryBox]);

  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(dropTargets);

  return {isGrabbed, isInspecting, isSelected, refGrabbableBox};
};
