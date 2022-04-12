import {useCallback} from 'react';

import {gameController} from '../../datastores/gameController';


export const useDeleteGameSetting = () => {
  const deleteGameSetting = useCallback((name: string) => {
    gameController.gameSettings.delete(name);
    gameController.syncSettings();
  }, []);

  return deleteGameSetting;
};
