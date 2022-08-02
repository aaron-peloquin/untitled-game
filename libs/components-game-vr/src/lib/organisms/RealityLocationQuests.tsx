import {useGetBand, useGetLocation, useListQuestsById} from '@datastore';
import {MutableRefObject} from 'react';
import {Mesh} from 'three';

import {RealityLocationQuest} from '../molecules/RealityLocationQuest';

type Props = {
  refSelectQuestBox: MutableRefObject<Mesh | undefined>
}

const RealityLocationQuests: React.FC<Props> = ({refSelectQuestBox}) => {
  const band = useGetBand();
  const location = useGetLocation(band?.currentLocationId);
  // const locationMercenaries = useListMercenariesById(location?.mercenaryIds);
  // const relatedLocations = useListLocationsById(location?.relatedLocationIds);
  const locationQuests = useListQuestsById(location?.questIds, true);

  return <group position={[0, 0, 0]}>
    {locationQuests?.map((quest, index) => <RealityLocationQuest
      key={quest.questId}
      quest={quest}
      offset={index}
      refSelectQuestBox={refSelectQuestBox}
    />)}
  </group>;
};

RealityLocationQuests.displayName = 'RealityLocationQuests';
export {RealityLocationQuests};
