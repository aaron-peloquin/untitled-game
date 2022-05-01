import {useListGameSaves} from '@datastore';

import {RealitySaveGameItem} from '../molecules/RealitySaveGameItem';

const RealityMainMenu: React.FC = () => {
  const gameSaves = useListGameSaves();

  return <group>{gameSaves?.map((gameSave, index) => {
    return <group position={[0, .5 * index, .5]} key={gameSave.gameSaveId}>
      <RealitySaveGameItem gameSave={gameSave} index={index} />
    </group>;
  })}</group>;
};

RealityMainMenu.displayName = 'RealityMainMenu';

export {RealityMainMenu};
