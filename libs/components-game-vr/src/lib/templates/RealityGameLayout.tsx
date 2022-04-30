import {TopNav} from '@components-game';
import {GameDataProvider} from '@datastore';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';

import {BandPanelReality} from '../organisms/BandPanelReality';
import {RealityMainMenu} from '../organisms/RealityMainMenu';


// type T_Props = {}

const RealityGameLayout: React.FC = () => {
  return <div>
    <TopNav />
    <VRCanvas>
      <GameDataProvider>
        <ambientLight />
        <pointLight position={[8, 10, 10]} />
        <DefaultXRControllers />
        <group position={[0, 0, 2]} rotation={[0, 3.14, 0]}>
          <RealityMainMenu />
        </group>
        <group position={[-15, 1, -20]}>
          <BandPanelReality />
        </group>
      </GameDataProvider>
    </VRCanvas>
  </div>;
};

RealityGameLayout.displayName = 'RealityGameLayout';
export {RealityGameLayout};
