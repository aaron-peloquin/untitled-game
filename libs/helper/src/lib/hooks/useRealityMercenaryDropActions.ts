import {MutableRefObject, useCallback, useMemo} from 'react';
import {Mesh} from 'three';

import {useGrabAndDrop} from './useGrabAndDrop';

type args = {
  refSelectMercenaryBox?: MutableRefObject<Mesh | undefined>,
  setSelected: (unset?: boolean | undefined) => void,
  isSelected: boolean,

  refSparMercenaryBox?: MutableRefObject<Mesh | undefined>,
  statsVisible: boolean,
  canAffordSpar: boolean,
  spar: () => void,

  refHireMercenaryBox?: MutableRefObject<Mesh | undefined>,
  canAffordHire: boolean,
  hire: () => void,
  slotsAvailable: boolean,
}

export const useRealityMercenaryDropActions = ({
  refSelectMercenaryBox,
  setSelected,
  isSelected,

  refSparMercenaryBox,
  statsVisible,
  canAffordSpar,
  spar,

  refHireMercenaryBox,
  canAffordHire,
  hire,
  slotsAvailable,
}: args) => {
  const handleSpar = useCallback((distance) => {
    if (!statsVisible && canAffordSpar) {
      if (distance <= .15) {
        spar();
      }
    }
  }, [canAffordSpar, spar, statsVisible]);

  const handleHire = useCallback((distance) => {
    if (canAffordHire && slotsAvailable) {
      if (distance <= .15) {
        hire();
      }
    }
  }, [canAffordHire, hire, slotsAvailable]);

  const handleSelect = useCallback((distance) => {
    if (distance <= .15) {
      setSelected();
    } else if (isSelected) {
      setSelected(true);
    }
  }, [isSelected, setSelected]);

  const dropTargets = useMemo(() => {
    const targets = [];
    if (refSelectMercenaryBox) {
      targets.push({handleDrop: handleSelect, refReceiverBox: refSelectMercenaryBox});
    }
    if (refSparMercenaryBox) {
      targets.push({handleDrop: handleSpar, refReceiverBox: refSparMercenaryBox});
    }
    if (refHireMercenaryBox) {
      targets.push({handleDrop: handleHire, refReceiverBox: refHireMercenaryBox});
    }
    return targets;
  }, [handleHire, handleSelect, handleSpar, refHireMercenaryBox, refSelectMercenaryBox, refSparMercenaryBox]);

  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(dropTargets);

  return {isGrabbed, isSelected, refGrabbableBox};
};
