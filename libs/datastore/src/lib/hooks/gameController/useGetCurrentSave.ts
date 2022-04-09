import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';
import {T_GameSave} from 'TS_General';

import {gameController} from '../../datastores/gameController';

export const useGetCurrentSave = () => {
  const currentSave = useLiveQuery<T_GameSave | undefined>(() => IS_SSR ? undefined : gameController.gameSaves.where('currentSave').above(0).first());
  return currentSave;
};
