/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {GameDataProvider} from '@datastore';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';

import {RealityScene} from '../atoms/RealityScene';

import {RealityBandPanel} from '../organisms/RealityBandPanel';
import {RealityMainMenu} from '../organisms/RealityMainMenu';


// type T_Props = {}

const RealityGameLayout: React.FC = () => {
  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataProvider>
        <RealityScene />
        <DefaultXRControllers />
        <group position={[0, 0, 2]} rotation={[0, 3.14, 0]}>
          <RealityMainMenu />
        </group>
        <group position={[-15, 1, -20]}>
          <RealityBandPanel />
        </group>
      </GameDataProvider>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
