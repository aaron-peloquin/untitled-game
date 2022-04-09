import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {gameController} from '../../datastores/gameController';


export const useGetCurrentSave = () => {
  return useLiveQuery(() => IS_SSR ? undefined : gameController.gameSaves.where('currentSave').above(0).first());
};
