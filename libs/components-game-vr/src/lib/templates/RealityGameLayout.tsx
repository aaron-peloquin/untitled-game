/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';
import {useMemo, useRef} from 'react';
import {Mesh, Vector3} from 'three';

import {RealityBox} from '../atoms/RealityBox';


import {RealityScene} from '../atoms/RealityScene';
import {RealityText} from '../atoms/RealityText';
import {RealityBandMercenaries} from '../organisms/RealityBandMercenaries';

import {RealityBandPanel} from '../organisms/RealityBandPanel';
import {RealityLocationQuests} from '../organisms/RealityLocationQuests';
import {RealityMainMenu} from '../organisms/RealityMainMenu';

const RealityGameLayout: React.FC = () => {
  const refSelectBox = useRef<Mesh>();
  const GameDataBridge = useContextBridge(gameDataContext);
  const selectBoxPosition = useMemo(() => new Vector3(0, -0.1, .05), []);
  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataBridge>
        <RealityScene />
        <DefaultXRControllers />
        {/** Main Menu behind player */}
        <group position={[0, 1, 2]} rotation={[0, 3.14, 0]}>
          <RealityMainMenu />
        </group>
        {/** Game Elements */}
        <group position={[0, 0.75, -0.75]}>
          <RealityText text="Quest" fontSize={.25} position={[0, .75, -1]} color="gray" />
          <RealityBox transparent opacity={0.5} color='orange' ref={refSelectBox} position={selectBoxPosition} args={[.25, .15, .05]}>
            <RealityText text='Select' position={[0, .035, 0.03]} fontSize={0.075} />
            <RealityText text='(Grab &amp; drop here)' position={[0, -.05, 0.03]} fontSize={0.025} />
          </RealityBox>
        </group>
        <group position={[-18, 4, -16]}>
          <RealityBandPanel />
        </group>
        <group position={[-0.75, 0.75, 0]} rotation={[0, 1.5, 0]}>
          <RealityText text="Band" fontSize={.25} position={[0, .75, -1]} color="gray" />
          <RealityBandMercenaries />
        </group>
        <group position={[0.6, 0.75, -0.25]} rotation={[0, -1, 0]}>
          <RealityText text="Location" fontSize={.25} position={[0, .75, -1]} color="gray" />
          <RealityLocationQuests refSelectQuestBox={refSelectBox} />
        </group>
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
