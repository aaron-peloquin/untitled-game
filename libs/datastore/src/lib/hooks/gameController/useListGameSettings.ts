import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {gameController} from '../../datastores/gameController';


export const useListGameSettings = () => {
  const settings = useLiveQuery(() => IS_SSR ? [] : gameController.gameSettings.where('hidden').equals(0).toArray()) || [];
  return settings;
};
