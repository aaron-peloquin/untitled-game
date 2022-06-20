import {useGetBand, useListMercenariesById} from '@datastore';
import {MutableRefObject} from 'react';
import {Mesh} from 'three';

import {RealityMercenary} from '../molecules/RealityMercenary';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
}

const RealityBandMercenaries: React.FC<Props> = ({refSelectMercenaryBox}) => {
  const band = useGetBand();
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

  return <group position={[0, 0, 0]}>
    {bandMercenaries?.map((mercenary, index) => <RealityMercenary
      key={mercenary.mercenaryId}
      mercenary={mercenary}
      offset={index}
      refSelectMercenaryBox={refSelectMercenaryBox}
    />)}
  </group>;
};


RealityBandMercenaries.displayName = 'RealityBandMercenaries';
export {RealityBandMercenaries};
