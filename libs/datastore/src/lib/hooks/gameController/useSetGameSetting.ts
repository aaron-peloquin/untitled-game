import {ChangeEvent, useCallback} from 'react';

import {gameController} from '../../datastores/gameController';

export const useSetGameSetting = () => {
  const handleChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const {name, min, max} = event.target;
    let {value} = event.target;

    if (name) {
      if (min) {
        value = parseInt(value) < parseInt(min) ? min : value;
      }
      if (max) {
        value = parseInt(value) > parseInt(max) ? max : value;
      }
      gameController.gameSettings.update(name, {value});
    }
  }, []);
  return handleChange;
};
