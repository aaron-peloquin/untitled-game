import {useGetBand, useGetLocation, useListMercenariesById} from '@datastore';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';
import {RealityMercenary} from '../molecules/RealityMercenary';

const RealityLocationMercenaries: React.FC = () => {
  const refSparBox = useRef<Mesh>();
  const refHireBox = useRef<Mesh>();
  const sparBoxPosition = useMemo(() => new Vector3(0, 0.15, 0), []);
  const hireBoxPosition = useMemo(() => new Vector3(0, -0.15, 0), []);
  const band = useGetBand();
  const location = useGetLocation(band?.currentLocationId);
  const locationMercenaries = useListMercenariesById(location?.mercenaryIds);

  return <group>
    <RealityBox transparent opacity={0.5} color='brown' ref={refSparBox} position={sparBoxPosition} args={[.25, .2, .05]}>
      <RealityText text='Spar' position={[0, .05, 0.03]} fontSize={0.075} />
      <RealityText text='To reveals their stats' position={[0, -0.01, 0.03]} fontSize={0.025} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.075, 0.03]} fontSize={0.025} />
    </RealityBox>
    <RealityText text={`${band?.name}'s Band`} fontSize={0.025} position={[0, 0.015, 0]} color="gray" />
    <RealityText text={`currently has ${band?.gold} gold`} fontSize={0.025} position={[0, -0.015, 0]} color="gray" />
    <RealityBox transparent opacity={0.5} color='orange' ref={refHireBox} position={hireBoxPosition} args={[.25, .2, .05]}>
      <RealityText text='Hire' position={[0, .05, 0.03]} fontSize={0.075} />
      <RealityText text='Mercenary' position={[0, -0.01, 0.03]} fontSize={0.05} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.075, 0.03]} fontSize={0.025} />
    </RealityBox>

    <group position={[0.05, 0.075, 0]}>
      {locationMercenaries?.map((mercenary, index) => <RealityMercenary
        key={mercenary.mercenaryId}
        mercenary={mercenary}
        offset={index}
        offsetModifier={0.15}
        refHireMercenaryBox={refHireBox}
        refSparMercenaryBox={refSparBox}
      />)}
    </group>
  </group>;
};


RealityLocationMercenaries.displayName = 'RealityLocationMercenaries';
export {RealityLocationMercenaries};
