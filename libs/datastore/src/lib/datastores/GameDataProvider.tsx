import {memo, useMemo} from 'react';

import {GameDataClass} from './gameData';

import {gameDataContext} from './gameDataContext';

import {useGetCurrentSave} from '../hooks/gameController/useGetCurrentSave';

const {Provider} = gameDataContext;

const GameDataProvider: React.FC = memo(({children}) => {
  const save = useGetCurrentSave();
  const gameProviderValue = useMemo(() => {
    const dataStore = save?.gameDatastoreName ? new GameDataClass(save.gameDatastoreName, save.name, save.seed, save.totalLocations) : undefined;
    return {
      dataStore,
      name: save?.name || '',
      seed: save?.seed || '',
    };
  }, [save?.gameDatastoreName, save?.name, save?.seed, save?.totalLocations]);

  return <Provider value={gameProviderValue}>
    {children}
  </Provider>;
});

GameDataProvider.displayName = 'GameDataProvider';
export {
  GameDataProvider,
};
