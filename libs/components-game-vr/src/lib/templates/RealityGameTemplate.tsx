/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext, useGetBand, usePayWages} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';

import {RealityGameComponents} from './RealityGameComponents';
import {RealityWageComponents} from './RealityWageComponents';

import {RealityScene} from '../atoms/RealityScene';
import {RealityMainMenu} from '../organisms/RealityMainMenu';

const RealityGameTemplate: React.FC = () => {
  const GameDataBridge = useContextBridge(gameDataContext);
  const band = useGetBand();
  const {wagesDue} = usePayWages(band);

  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataBridge>
        <RealityScene />
        <DefaultXRControllers />
        { wagesDue ? <RealityWageComponents /> : <RealityGameComponents /> }
        {/** Main Menu behind player */}
        <group position={[0, 1, 2]} rotation={[0, Math.PI, 0]}>
          <RealityMainMenu />
        </group>
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameTemplate.displayName = 'RealityGameTemplate';
export {RealityGameTemplate};
