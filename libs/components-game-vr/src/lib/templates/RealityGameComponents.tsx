/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useGetBand, useGetLocation, useRest} from '@datastore';
import {useRef} from 'react';
import {Mesh} from 'three';

import {RealityText} from '../atoms/RealityText';
import {RealityBandMercenaries} from '../organisms/RealityBandMercenaries';
import {RealityBandPanel} from '../organisms/RealityBandPanel';
import {RealityLocationMercenaries} from '../organisms/RealityLocationMercenaries';
import {RealityLocationQuests} from '../organisms/RealityLocationQuests';
import {RealityMainMenu} from '../organisms/RealityMainMenu';
import {RealityQuestPanel} from '../organisms/RealityQuestPanel';
import {RealityTravel} from '../organisms/RealityTravel';

const RealityGameComponents: React.FC = () => {
  const refSelectBox = useRef<Mesh>();
  const band = useGetBand();
  const currentLocation = useGetLocation(band?.currentLocationId)
  const {restoreAp, restoreApAmount} = useRest(band);

  return <>
    {/** Main Menu behind player */}
    <group position={[0, 1, 2]} rotation={[0, Math.PI, 0]}>
      <RealityMainMenu />
    </group>
    {/** Game Elements */}
    <group position={[0, 1, -0.75]}>
      <RealityText text="Quest" fontSize={.25} position={[0, .75, -1]} color="gray" />
      <RealityQuestPanel refSelectBox={refSelectBox} />
    </group>
    <group position={[-0.7, 1, -0.25]} rotation={[0, 1, 0]}>
      <RealityBandPanel noBandAction={restoreApAmount < 0} bandActionText={`Rest Band (regain ${restoreApAmount} AP)`} bandActionCallback={restoreAp} />
      <RealityBandMercenaries refSelectMercenaryBox={refSelectBox} />
    </group>
    <group position={[.7, 1, -0.25]} rotation={[0, -1, 0]}>
      <RealityText text={`Location: ${currentLocation?.name}`} fontSize={.25} position={[0, .75, -1]} color="gray" />
      <RealityLocationQuests refSelectQuestBox={refSelectBox} />
    </group>
    <group position={[-0.8, 1, 0.5]} rotation={[0, 1.5, 0]}>
      <RealityTravel />
    </group>
    <group position={[0.8, 1, 0]} rotation={[0, -1.5, 0]}>
      <RealityLocationMercenaries />
    </group>
  </>;
};

RealityGameComponents.displayName = 'RealityGameComponents';
export {RealityGameComponents};
