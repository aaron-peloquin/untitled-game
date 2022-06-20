/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {Plane, useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';


import {RealityScene} from '../atoms/RealityScene';
import {RealityText} from '../atoms/RealityText';
import {RealityBandMercenaries} from '../organisms/RealityBandMercenaries';

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
        {/* <group position={[0, 4, -16]}>
          <RealityBandPanel />
        </group> */}
        <group position={[-.7, 1, -0.25]} rotation={[0, 1, 0]}>
          <RealityText text="Band" fontSize={.25} position={[0, .75, -1]} color="gray" />
          <RealityBandMercenaries refSelectMercenaryBox={refSelectBox} />
        </group>
        <group position={[.7, 1, -0.25]} rotation={[0, -1, 0]}>
          <RealityText text="Location" fontSize={.25} position={[0, .75, -1]} color="gray" />
          <RealityLocationQuests refSelectQuestBox={refSelectBox} />
        </group>
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
