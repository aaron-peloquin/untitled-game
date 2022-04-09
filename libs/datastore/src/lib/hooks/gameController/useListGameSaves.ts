import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {gameController} from '../../datastores/gameController';

export const useListGameSaves = () => {
  return useLiveQuery(() => IS_SSR ? [] : gameController.gameSaves.toArray());
};
