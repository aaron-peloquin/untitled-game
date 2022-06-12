import {useGetMercenaryStats, useSetSelectMercenaryId} from '@datastore';
import {useGrabAndDrop} from '@helper';
import {MutableRefObject, useMemo, useCallback} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  refInspectMercenaryBox: MutableRefObject<Mesh | undefined>
  mercenary: T_Mercenary
  setInspectMercenaryId: (mercenaryId: number) => void
  offset: number
}

const RealityBandMercenary: React.FC<Props> = ({refSelectMercenaryBox, refInspectMercenaryBox, setInspectMercenaryId, mercenary, offset}) => {
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenary.mercenaryId);
  const stats = useGetMercenaryStats(mercenary);
  const position = useMemo(() => new Vector3(-.11 * offset, -.075 * offset, 0), [offset]);

  const handleInspect = useCallback((distance) => {
    if (distance <= .2) {
      setInspectMercenaryId(mercenary.mercenaryId);
    }
  }, [mercenary.mercenaryId, setInspectMercenaryId]);

  const handleSelect = useCallback((distance) => {
    if (distance <= .15) {
      setSelected();
    }
  }, [setSelected]);

  const dropTargets = useMemo(() => ([
    {handleDrop: handleInspect, refReceiverBox: refInspectMercenaryBox},
    {handleDrop: handleSelect, refReceiverBox: refSelectMercenaryBox},
  ]), [handleInspect, handleSelect, refInspectMercenaryBox, refSelectMercenaryBox]);

  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(dropTargets);

  const currentColor = (isSelected ? 'teal' : (isGrabbed ? 'forestgreen' : stats.textColorEthnicity));

  return <RealityBox color={currentColor} ref={refGrabbableBox} position={position}>
    <RealityText text={`${mercenary?.name}${isSelected ? '*' : ''}`} fontSize={.05} position={[0, .01, 0.055]} />
    <RealityText text={`${stats?.ethnicity} ${stats?.profession}`} position={[0, -.03, 0.055]} fontSize={0.025} />
  </RealityBox>;
};

RealityBandMercenary.displayName = 'RealityBandMercenary';
export {RealityBandMercenary};
