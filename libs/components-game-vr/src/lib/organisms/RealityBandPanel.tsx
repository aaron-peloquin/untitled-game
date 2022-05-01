/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand} from '@datastore';
import {Billboard, Plane} from '@react-three/drei';

import {RealityText} from '../atoms/RealityText';

const RealityBandPanel: React.FC = () => {
  const band = useGetBand();
  // const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  // const bandLocation = useGetLocation(band?.currentLocationId);

  return <group>
    {/** @ts-ignore */}
    <Billboard>
      {/** @ts-ignore */}
      <Plane position={[0, 1.3, -.01]} args={[12, 2, 1]}>
        <meshBasicMaterial color="grey" />
      </Plane>
      <RealityText position={[0, 1.9, 0]} text={`${band?.name.substring(0, 8)}'s Mercenary Band`} fontSize={0.75} />
      <RealityText position={[0, 1.25, 0]} text={`Gold: ${band?.gold}`} />
      <RealityText position={[0, .75, 0]} text={`AP: ${band?.actionPoints}`} />
    </Billboard>
  </group>;
};

RealityBandPanel.displayName = 'RealityBandPanel';
export {RealityBandPanel};
