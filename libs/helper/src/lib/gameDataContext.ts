import {NEW_BAND} from '@band';
import {createContext} from 'react';
import {T_GameData} from 'TS_General';

export const gameDataContext = createContext<T_GameData>({
  bandController: {
    addMercenary: () => {
      return;
    },
    adjustGold: () => {
      return;
    },
    data: NEW_BAND,
    removeMercenary: () => {
      return;
    },
  },
  currentLocation: {
    level: 0,
    levelRanges: [],
    mercenaries: [],
    name: 'Nowhere',
    quests: [],
  },
  pastLocations: [],
  seed: 'Game Seed',
  // seededLocationGenerator: null,
  // setCurrentLocation: () => { },
  // setSeed: () => { },
});
