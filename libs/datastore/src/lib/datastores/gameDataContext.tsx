import {emptyFunction} from '@static';
import {createContext, Dispatch, SetStateAction} from 'react';

import {GameDataClass} from './gameData';

export type T_GameDataContext = {
  dataStore?: GameDataClass
  name: string
  seed: string
  inspectMercenaryId: number
  selectedMercenaryId: number
  selectedQuestId: number
  setInspectMercenaryId: Dispatch<SetStateAction<number>>
  setSelectedMercenaryId: Dispatch<SetStateAction<number>>
  setSelectedQuestId: Dispatch<SetStateAction<number>>
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
