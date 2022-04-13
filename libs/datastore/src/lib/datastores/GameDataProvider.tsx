import {memo, useMemo, useState} from 'react';

import {GameDataClass} from './gameData';
import {gameDataContext, T_GameDataContext} from './gameDataContext';

import {useGetCurrentSave} from '../hooks/gameController/useGetCurrentSave';

const {Provider} = gameDataContext;

const GameDataProvider: React.FC = memo(({children}) => {
  const [selectedMercenaryId, setSelectedMercenaryId] = useState(0);
  const [selectedQuestId, setSelectedQuestId] = useState(0);

  const save = useGetCurrentSave();
  const gameProviderValue = useMemo<T_GameDataContext>(() => {
    const dataStore = save?.gameDatastoreName ? new GameDataClass(save.gameDatastoreName, save.name, save.seed, save.totalLocations) : undefined;
    return {
      dataStore,
      name: save?.name || '',
      seed: save?.seed || '',
      selectedMercenaryId,
      selectedQuestId,
      setSelectedMercenaryId,
      setSelectedQuestId,
    };
  }, [save?.gameDatastoreName, save?.name, save?.seed, save?.totalLocations, selectedMercenaryId, selectedQuestId]);

  return <Provider value={gameProviderValue}>
    {children}
  </Provider>;
});

GameDataProvider.displayName = 'GameDataProvider';
export {
  GameDataProvider,
};
