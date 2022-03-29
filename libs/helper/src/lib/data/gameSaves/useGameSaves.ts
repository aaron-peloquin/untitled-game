import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';
import {db} from '../db';

export const useGameSaves = () => {
  return useLiveQuery(() => IS_SSR ? [] : db.gameSaves.toArray());
};

