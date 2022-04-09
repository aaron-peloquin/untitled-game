import {createContext, useContext} from 'react';

import {GameDataClass} from './gameData';

type T_GameDataContext = {
  dataStore?: GameDataClass
  name: string
  seed: string
}

const gameDataContextDefault = {
  dataStore: undefined,
  name: '',
  seed: '',
};
export const gameDataContext = createContext<T_GameDataContext>(gameDataContextDefault);
