import {MutableRefObject, useCallback, useMemo} from 'react';
import {Mesh} from 'three';

import {useGrabAndDrop} from './useGrabAndDrop';

export const useRealityQuestDropActions = (
    refSelectQuestBox: MutableRefObject<Mesh | undefined>,
    setSelected: (unset?: boolean | undefined) => void,
    isSelected: boolean,
) => {
  const handleSelect = useCallback((distance) => {
    if (distance <= .15) {
      setSelected();
    } else if (isSelected) {
      setSelected(true);
    }
  }, [isSelected, setSelected]);

  const dropTargets = useMemo(() => ([
    {handleDrop: handleSelect, refReceiverBox: refSelectQuestBox},
  ]), [handleSelect, refSelectQuestBox]);

  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(dropTargets);

  return {isGrabbed, isSelected, refGrabbableBox};
};
