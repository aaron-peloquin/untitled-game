import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {db} from '../db';

export const useCurrentSave = () => {
  return useLiveQuery(() => IS_SSR ? undefined : db.gameSaves.where('currentSave').above(0).first());
};
