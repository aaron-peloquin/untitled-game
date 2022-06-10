import {useGetMercenaryStats, useSetSelectMercenaryId} from '@datastore';
import {useGrabAndDrop} from '@helper';
import {MutableRefObject, useMemo, useCallback, useState} from 'react';
import {Mesh, Vector3} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  mercenary: T_Mercenary
  offset: number
}

const RealityBandMercenary: React.FC<Props> = ({refSelectMercenaryBox, mercenary, offset}) => {
  const [d, setD] = useState(4.444);
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenary.mercenaryId);
  const stats = useGetMercenaryStats(mercenary);
  const position = useMemo(() => new Vector3(-.1 * offset, -.1 * offset, 0), [offset]);

  const handleSelect = useCallback((distance) => {
    setD(distance.toFixed(3));
    if (distance <= .03) {
      setSelected();
    }
  }, [setSelected]);
  const {isGrabbed, refGrabbableBox} = useGrabAndDrop(refSelectMercenaryBox, handleSelect);
  const currentColor = (isSelected ? 'teal' : (isGrabbed ? 'forestgreen' : stats.textColorEthnicity));

  return <RealityBox color={currentColor} ref={refGrabbableBox}>
    <RealityText text={`${mercenary?.name} ${d}`} fontSize={.05} position={[0, .01, 0.055]} />
    <RealityText text={`${stats?.profession} ${stats?.ethnicity}`} position={[0, -.03, 0.055]} fontSize={0.025} />
  </RealityBox>;
};

RealityBandMercenary.displayName = 'RealityBandMercenary';
export {RealityBandMercenary};
