/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand, useQuestRunner} from '@datastore';
import {displayNumber, getMaxBandMercenaries} from '@helper';
import {Billboard, Plane} from '@react-three/drei';

import {RealityText} from '../atoms/RealityText';

const RealityBandPanel: React.FC = () => {
  const band = useGetBand();
  const {questRunnerText} = useQuestRunner();
  // const bandLocation = useGetLocation(band?.currentLocationId);

  return <group>
    <Billboard>
      <Plane position={[0, 1.3, -.01]} args={[12, 2.75, 1]}>
        <meshBasicMaterial color="grey" />
      </Plane>
      <RealityText position={[0, 2.05, 0]} text={`${band?.name.substring(0, 8)}'s Mercenary Band (lvl: ${displayNumber(band?.level, 2)})`} fontSize={0.75} />
      <RealityText position={[-2, 1.25, 0]} text={`${band?.gold} Gold`} />
      <RealityText position={[2, 1.25, 0]} text={`${band?.actionPoints} AP`} />
      <RealityText position={[0, .75, 0]} text={`${band?.mercenaryIds.length}/${getMaxBandMercenaries(band)} Mercenaries, ${band?.daysUntilWages} days until wages are due`} />
      <RealityText position={[0, .25, 0]} color="black" text={questRunnerText} />
    </Billboard>
  </group>;
};

RealityBandPanel.displayName = 'RealityBandPanel';
export {RealityBandPanel};
