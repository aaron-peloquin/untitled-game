import {memo, useEffect, useMemo, useState} from 'react';

import {GameDataClass} from './gameData';
import {gameDataContext, T_GameDataContext} from './gameDataContext';

import {useGetCurrentSave} from '../hooks/gameController/useGetCurrentSave';
import {useGetGameSetting} from '../hooks/gameController/useGetGameSetting';

const {Provider} = gameDataContext;

const GameDataProvider: React.FC = memo(({children}) => {
  const [selectedMercenaryId, setSelectedMercenaryId] = useState(0);
  const [selectedQuestId, setSelectedQuestId] = useState(0);
  const apPerDay = useGetGameSetting('ap_per_day');

  const save = useGetCurrentSave();
  useEffect(() => {
    if (save) {
      setSelectedQuestId(0);
    }
  }, [save]);
  const gameProviderValue = useMemo<T_GameDataContext>(() => {
    const dataStore = apPerDay !== undefined && save?.gameDatastoreName ? new GameDataClass(save.gameDatastoreName, save.name, save.seed, save.totalLocations, parseInt(apPerDay.value)) : undefined;
    return {
      dataStore,
      name: save?.name || '',
      seed: save?.seed || '',
      selectedMercenaryId,
      selectedQuestId,
      setSelectedMercenaryId,
      setSelectedQuestId,
    };
  }, [apPerDay, save?.gameDatastoreName, save?.name, save?.seed, save?.totalLocations, selectedMercenaryId, selectedQuestId]);

  return <Provider value={gameProviderValue}>
    {children}
  </Provider>;
});

GameDataProvider.displayName = 'GameDataProvider';
export {
  GameDataProvider,
};
