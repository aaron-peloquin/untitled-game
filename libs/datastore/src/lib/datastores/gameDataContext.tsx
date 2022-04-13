import {emptyFunction} from '@static';
import {createContext} from 'react';

import {GameDataClass} from './gameData';

export type T_GameDataContext = {
  dataStore?: GameDataClass
  name: string
  seed: string
  selectedMercenaryId: number
  selectedQuestId: number
  setSelectedMercenaryId: (id: number) => void
  setSelectedQuestId: (id: number) => void
}

const gameDataContextDefault: T_GameDataContext = {
  dataStore: undefined,
  name: '',
  seed: '',
  selectedMercenaryId: 0,
  selectedQuestId: 0,
  setSelectedMercenaryId: emptyFunction,
  setSelectedQuestId: emptyFunction,
};
export const gameDataContext = createContext<T_GameDataContext>(gameDataContextDefault);
