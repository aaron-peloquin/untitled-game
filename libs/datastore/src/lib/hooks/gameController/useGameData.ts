import {useContext} from 'react';

import {gameDataContext} from '../../datastores/gameDataContext';

export const useGameData = () => {
  return useContext(gameDataContext);
};

