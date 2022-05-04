/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';

import {RealityScene} from '../atoms/RealityScene';

import {RealityBandPanel} from '../organisms/RealityBandPanel';
import {RealityMainMenu} from '../organisms/RealityMainMenu';


// type T_Props = {}

const RealityGameLayout: React.FC = () => {
  const GameDataBridge = useContextBridge(gameDataContext);
  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataBridge>
        <RealityScene />
        <DefaultXRControllers />
        <group position={[0, 1, 2]} rotation={[0, 3.14, 0]}>
          <RealityMainMenu />
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
