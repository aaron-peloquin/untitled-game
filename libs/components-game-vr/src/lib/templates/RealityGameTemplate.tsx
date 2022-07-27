/* eslint-disable @typescript-eslint/ban-ts-comment */
import {TopNav} from '@components-game';
import {gameDataContext} from '@datastore';
import {useContextBridge} from '@react-three/drei';
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';

import {RealityGameLayout} from './RealityGameLayout';

import {RealityScene} from '../atoms/RealityScene';


const RealityGameTemplate: React.FC = () => {
  const GameDataBridge = useContextBridge(gameDataContext);
  return <div>
    <TopNav />
    {/** @ts-ignore, cleanup DOM error */}
    <VRCanvas vr="true">
      <GameDataBridge>
        <RealityScene />
        <DefaultXRControllers />
        <RealityGameLayout />
      </GameDataBridge>
    </VRCanvas>
  </div>;
};

RealityGameTemplate.displayName = 'RealityGameTemplate';
export {RealityGameTemplate};
