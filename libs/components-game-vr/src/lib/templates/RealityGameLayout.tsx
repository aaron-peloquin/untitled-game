/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers, Hands} from '@react-three/xr';

import {GrabBall} from '../atoms/GrabBall';

import {RealityScene} from '../atoms/RealityScene';

import {RealityBandPanel} from '../organisms/RealityBandPanel';
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
          <group position={[0, 1, 2]} rotation={[0, 3.14, 0]}>
            <RealityMainMenu />
          </group>
          <group position={[0, 1.2, -.75]}>
            <GrabBall />
          </group>
          <group position={[-15, 1, -20]}>
            <RealityBandPanel />
          </group>
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
