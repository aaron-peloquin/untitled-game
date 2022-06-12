import {emptyFunction} from '@static';
import {createContext} from 'react';

import {GameDataClass} from './gameData';

export type T_GameDataContext = {
  dataStore?: GameDataClass
  name: string
  seed: string
  inspectMercenaryId: number
  selectedMercenaryId: number
  selectedQuestId: number
  setInspectMercenaryId: (id?: number) => void
  setSelectedMercenaryId: (id?: number) => void
  setSelectedQuestId: (id: number) => void
}

const gameDataContextDefault: T_GameDataContext = {
  dataStore: undefined,
  inspectMercenaryId: 0,
  name: '',
  seed: '',
  selectedMercenaryId: 0,
  selectedQuestId: 0,
  setInspectMercenaryId: emptyFunction,
  setSelectedMercenaryId: emptyFunction,
  setSelectedQuestId: emptyFunction,
};
export const gameDataContext = createContext<T_GameDataContext>(gameDataContextDefault);
