import {useGetBand, useListMercenariesById} from '@datastore';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBandMercenary} from './RealityBandMercenary';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';

const RealityBandMercenaries = () => {
  const refSelectMercenaryBox = useRef<Mesh>();
  const selectPosition = useMemo(() => new Vector3(0, 0.25, 0), []);
  const band = useGetBand();
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

  return <>
    {bandMercenaries?.map((mercenary, index) => <RealityBandMercenary key={mercenary.mercenaryId} mercenary={mercenary} offset={index} refSelectMercenaryBox={refSelectMercenaryBox} />)}
    <RealityBox transparent opacity={0.5} color='orange' ref={refSelectMercenaryBox} position={selectPosition} args={[.15, .15, .05]}>
      <RealityText text='Select' position={[0, .035, 0.03]} fontSize={0.075} />
      <RealityText text='(Drop mercenary in here)' position={[0, -.09, 0.03]} fontSize={0.025} />
    </RealityBox>
  </>;
};


RealityBandMercenaries.displayName = 'RealityBandMercenaries';
export {RealityBandMercenaries};
