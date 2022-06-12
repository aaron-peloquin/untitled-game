/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers, Hands} from '@react-three/xr';


import {RealityScene} from '../atoms/RealityScene';
import {RealityMercenaryInspect} from '../molecules/RealityMercenaryInspect';
import {RealityBandMercenaries} from '../organisms/RealityBandMercenaries';

import {RealityBandPanel} from '../organisms/RealityBandPanel';
import {RealityLocationQuests} from '../organisms/RealityLocationQuests';
import {RealityMainMenu} from '../organisms/RealityMainMenu';

const RealityGameLayout: React.FC = () => {
  const GameDataBridge = useContextBridge(gameDataContext);
  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataBridge>
        <RealityScene />
        <DefaultXRControllers />
        <Hands />
        {/** Main Menu behind player */}
        <group position={[0, 1, 2]} rotation={[0, 3.14, 0]}>
          <RealityMainMenu />
        </group>
        {/** Game Elements */}
        <group position={[-16, 4, -20]}>
          <RealityBandPanel />
        </group>
        <group position={[-4, 0.5, -5]} rotation={[0, 0.75, 0.04]}>
          <RealityMercenaryInspect />
        </group>
        <group position={[-0.75, 0.75, 0]} rotation={[0, 1.5, 0]}>
          <RealityBandMercenaries />
        </group>
        <group position={[0.75, 0.75, 0]} rotation={[0, -1.5, 0]}>
          <RealityLocationQuests />
        </group>
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
