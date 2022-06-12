import {useGetBand, useGetLocation, useListQuestsById} from '@datastore';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';
import {RealityText} from '../atoms/RealityText';
import {RealityLocationQuest} from '../molecules/RealityLocationQuest';

const RealityLocationQuests = () => {
  const band = useGetBand();
  const refSelectQuestBox = useRef<Mesh>();
  const location = useGetLocation(band?.currentLocationId);
  const selectPosition = useMemo(() => new Vector3(0.23, 0.15, 0), []);
  // const locationMercenaries = useListMercenariesById(location?.mercenaryIds);
  // const relatedLocations = useListLocationsById(location?.relatedLocationIds);
  const locationQuests = useListQuestsById(location?.questIds, true);

  return <>
    <group position={[0, .15, 0]}>
      {locationQuests?.map((quest, index) => <RealityLocationQuest
        key={quest.questId}
        quest={quest}
        offset={index}
        refSelectQuestBox={refSelectQuestBox}
      />)}
    </group>
    <RealityBox transparent opacity={0.5} color='orange' ref={refSelectQuestBox} position={selectPosition} args={[.25, .15, .05]}>
      <RealityText text='Select' position={[0, .035, 0.03]} fontSize={0.075} />
      <RealityText text='(Grab &amp; drop here)' position={[0, -.05, 0.03]} fontSize={0.025} />
    </RealityBox>
  </>;
};

RealityLocationQuests.displayName = 'RealityLocationQuests';
export {RealityLocationQuests};
