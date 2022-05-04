import {useSetCurrentGameSave} from '@datastore';
import {T_GameSave} from 'TS_General';

import {RealityButton} from '../atoms/RealityButton';

type T_Props = {
  gameSave: T_GameSave
  index?: number
}

const RealitySaveGameItem: React.FC<T_Props> = ({gameSave, index}) => {
  const setGameSave = useSetCurrentGameSave(false);
  const handleSetSave = () => setGameSave(gameSave.gameSaveId);
  return <RealityButton handleSelect={handleSetSave} text={`Load: ${gameSave.name}`} />;
};

RealitySaveGameItem.displayName = 'RealitySaveGameItem';
export {RealitySaveGameItem};
