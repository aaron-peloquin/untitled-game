import {useCallback} from 'react';
import {T_GameSave} from 'TS_General';

import {useSetCurrentGameSave} from './useSetCurrentGameSave';

import {gameController} from '../../datastores/gameController';

export const useAddGameSave = (landingPage?: string) => {
  const setCurrentGameSave = useSetCurrentGameSave(landingPage);
  return useCallback((name: string, seed: string) => {
    const newSave: T_GameSave = {
      currentLocation: 0,
      currentSave: 0,
      gameDatastoreName: '',
      name,
      pastLocations: [],
      seed,
    };
    gameController.gameSaves.add(newSave).then((id) => {
      const gameDatastoreName = `${id}_${name}`.replace(/[^a-zA-Z0-9_]/g, '-').toLowerCase();
      gameController.gameSaves.update(id, {gameDatastoreName}).then(() => {
        setCurrentGameSave(id);
      });
    });
  }, [setCurrentGameSave]);
};
