import {useGetMercenaryStats, useSetInspectMercenaryId, useSetSelectMercenaryId} from '@datastore';
import {useRealityMercenaryDropActions} from '@helper';
import {MutableRefObject, useMemo} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  refInspectMercenaryBox: MutableRefObject<Mesh | undefined>
  mercenary: T_Mercenary
  offset: number
}

const RealityBandMercenary: React.FC<Props> = ({refSelectMercenaryBox, refInspectMercenaryBox, mercenary, offset}) => {
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenary.mercenaryId);
  const {isInspecting, setInspect} = useSetInspectMercenaryId(mercenary.mercenaryId);
  const {isGrabbed, refGrabbableBox} = useRealityMercenaryDropActions(refSelectMercenaryBox, refInspectMercenaryBox, setSelected, setInspect, isSelected, isInspecting);
  const mercenaryStats = useGetMercenaryStats(mercenary);

  const position = useMemo(() => new Vector3(-.11 * offset, -.075 * offset, 0), [offset]);
  const currentColor = (isSelected ? 'teal' : (isGrabbed ? 'forestgreen' : mercenaryStats.textColorEthnicity));

  return <RealityBox color={currentColor} ref={refGrabbableBox} position={position}>
    <RealityText text={`${mercenary?.name}${isSelected ? '*' : ''}${isInspecting ? '^' : ''}`} fontSize={.05} position={[0, .01, 0.055]} />
    <RealityText text={`${mercenaryStats?.ethnicity} ${mercenaryStats?.profession}`} position={[0, -.03, 0.055]} fontSize={0.025} />
  </RealityBox>;
};

RealityBandMercenary.displayName = 'RealityBandMercenary';
export {RealityBandMercenary};
