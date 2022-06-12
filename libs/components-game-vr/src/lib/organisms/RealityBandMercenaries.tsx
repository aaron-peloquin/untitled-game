import {useGetBand, useListMercenariesById} from '@datastore';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';
import {RealityBandMercenary} from '../molecules/RealityBandMercenary';

const RealityBandMercenaries = () => {
  const band = useGetBand();
  const refSelectMercenaryBox = useRef<Mesh>();
  const refInspectMercenaryBox = useRef<Mesh>();
  const selectPosition = useMemo(() => new Vector3(0.23, 0.15, 0), []);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  // const inspectPosition = useMemo(() => new Vector3(0.23, -0.04, 0), []);

  return <>
    <group position={[0, .15, 0]}>
      {bandMercenaries?.map((mercenary, index) => <RealityBandMercenary
        key={mercenary.mercenaryId}
        mercenary={mercenary}
        offset={index}
        refSelectMercenaryBox={refSelectMercenaryBox}
        refInspectMercenaryBox={refInspectMercenaryBox}
      />)}
    </group>
    <RealityBox transparent opacity={0.5} color='orange' ref={refSelectMercenaryBox} position={selectPosition} args={[.25, .15, .05]}>
      <RealityText text='Select' position={[0, .035, 0.03]} fontSize={0.075} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.05, 0.03]} fontSize={0.025} />
    </RealityBox>
    {/* <RealityBox transparent opacity={0.5} color='blue' ref={refInspectMercenaryBox} position={inspectPosition} args={[.25, .15, .05]}>
      <RealityText text="Inspect" position={[0, .035, 0.03]} fontSize={0.075} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.05, 0.03]} fontSize={0.025} />
    </RealityBox> */}
  </>;
};


RealityBandMercenaries.displayName = 'RealityBandMercenaries';
export {RealityBandMercenaries};
