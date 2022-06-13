import {memo, useEffect, useMemo, useState} from 'react';

import {GameDataClass} from './gameData';
import {gameDataContext, T_GameDataContext} from './gameDataContext';

import {useGetCurrentSave} from '../hooks/gameController/useGetCurrentSave';
import {useGetGameSetting} from '../hooks/gameController/useGetGameSetting';

const {Provider} = gameDataContext;

const GameDataProvider: React.FC = memo(({children}) => {
  const [inspectMercenaryId, setInspectMercenaryId] = useState(0);
  const [selectedMercenaryId, setSelectedMercenaryId] = useState(0);
  const [selectedQuestId, setSelectedQuestId] = useState(0);
  const apPerDay = useGetGameSetting('ap_per_day');
  const startingGold = useGetGameSetting('starting_gold');

  const save = useGetCurrentSave();

  useEffect(() => {
    if (save) {
      setInspectMercenaryId(0);
      setSelectedMercenaryId(0);
      setSelectedQuestId(0);
    }
  }, [save]);
  const gameProviderValue = useMemo<T_GameDataContext>(() => {
    const dataStore = (apPerDay !== undefined && startingGold !== undefined && save?.gameDatastoreName) ? new GameDataClass(save.gameDatastoreName, save.name, save.seed, save.totalLocations, parseInt(apPerDay.value), parseInt(startingGold.value)) : undefined;

    const value: T_GameDataContext = {
      dataStore,
      inspectMercenaryId,
      name: save?.name || '',
      seed: save?.seed || '',
      selectedMercenaryId,
      selectedQuestId,
      setInspectMercenaryId,
      setSelectedMercenaryId,
      setSelectedQuestId,
    };
    return value;
  }, [apPerDay, inspectMercenaryId, save?.gameDatastoreName, save?.name, save?.seed, save?.totalLocations, selectedMercenaryId, selectedQuestId, startingGold]);

  return <Provider value={gameProviderValue}>
    {children}
  </Provider>;
});

GameDataProvider.displayName = 'GameDataProvider';
export {
  GameDataProvider,
};
