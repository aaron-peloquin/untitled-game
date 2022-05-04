import {useListGameSaves} from '@datastore';
import {useThree} from '@react-three/fiber';
import {URLs} from '@static';
import {useCallback} from 'react';

import {RealityButton} from '../atoms/RealityButton';

import {RealitySaveGameItem} from '../molecules/RealitySaveGameItem';

const RealityMainMenu: React.FC = () => {
  const gameSaves = useListGameSaves();
  const {gl} = useThree();

  const handleExitVr = useCallback(() => {
    const session = gl.xr.getSession();
    session.end().then(() => {
      window.location.pathname = URLs.playGame;
    });
  }, [gl.xr]);
  return <group>
    <RealityButton handleSelect={handleExitVr} text="Exit VR" fontSize={.1} fontColor="blue" />;
    {gameSaves?.map((gameSave, index) => {
      return <group position={[0, -.2 * (index + 1), 0]} key={gameSave.gameSaveId}>
        <RealitySaveGameItem gameSave={gameSave} />;
      </group>;
    })}</group>;
};

RealityMainMenu.displayName = 'RealityMainMenu';

export {RealityMainMenu};
