import {useGetBand, useListMercenariesById} from '@datastore';
import {MutableRefObject, useRef} from 'react';
import {Mesh} from 'three';

import {RealityMercenary} from '../molecules/RealityMercenary';

type Props = {
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
}

const RealityBandMercenaries: React.FC<Props> = ({refSelectMercenaryBox}) => {
  const band = useGetBand();
  const refInspectMercenaryBox = useRef<Mesh>();
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

  return <group position={[0, 0, 0]}>
    {bandMercenaries?.map((mercenary, index) => <RealityMercenary
      key={mercenary.mercenaryId}
      mercenary={mercenary}
      offset={index}
      refSelectMercenaryBox={refSelectMercenaryBox}
      refInspectMercenaryBox={refInspectMercenaryBox}
    />)}
  </group>;
};


RealityBandMercenaries.displayName = 'RealityBandMercenaries';
export {RealityBandMercenaries};
