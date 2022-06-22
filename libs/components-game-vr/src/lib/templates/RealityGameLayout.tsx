/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';
import {useRef} from 'react';
import {Mesh} from 'three';

import {RealityScene} from '../atoms/RealityScene';
import {RealityText} from '../atoms/RealityText';
import {RealityBandMercenaries} from '../organisms/RealityBandMercenaries';
import {RealityBandPanel} from '../organisms/RealityBandPanel';
import {RealityLocationMercenaries} from '../organisms/RealityLocationMercenaries';
import {RealityLocationQuests} from '../organisms/RealityLocationQuests';
import {RealityMainMenu} from '../organisms/RealityMainMenu';
import {RealityQuestPanel} from '../organisms/RealityQuestPanel';

const RealityGameLayout: React.FC = () => {
  const refSelectBox = useRef<Mesh>();
  const GameDataBridge = useContextBridge(gameDataContext);
  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataBridge>
        <RealityScene />
        <DefaultXRControllers />
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
          <RealityBandPanel />
          <RealityBandMercenaries refSelectMercenaryBox={refSelectBox} />
        </group>
        <group position={[.7, 1, -0.25]} rotation={[0, -1, 0]}>
          <RealityText text="Location" fontSize={.25} position={[0, .75, -1]} color="gray" />
          <RealityLocationQuests refSelectQuestBox={refSelectBox} />
        </group>
        <group position={[0.8, 1, -0]} rotation={[0, -1.25, 0]}>
          <RealityLocationMercenaries />
        </group>
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
