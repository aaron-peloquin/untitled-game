import {ChangeEvent, useCallback} from 'react';

import {gameController} from '../../datastores/gameController';

export const useSetGameSetting = () => {
  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    if (name) {
      gameController.gameSettings.update(name, {value});
    }
    console.log(name, value);
  }, []);
  return handleChange;
};
