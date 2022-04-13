import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {gameController} from '../../datastores/gameController';

export const useGetGameSetting = (name: string) => {
  const setting = useLiveQuery(() => IS_SSR ? undefined : gameController.gameSettings.get(name), [name]);
  return setting?.hidden ? undefined : setting;
};
