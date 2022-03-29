import {URLs} from '@static';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {db} from '../db';
import {useCurrentSave} from './useCurrentSave';

export const useSetCurrentSave = () => {
  const router = useRouter();
  const currentSave = useCurrentSave();

  console.log('from hook', currentSave);

  const setGameSave = useCallback((id) => {
    if (currentSave?.id) {
      db.gameSaves.update(currentSave.id, {currentSave: 0});
    }
    db.gameSaves.update(id, {currentSave: 1});
    router.push(URLs.playGame);
    return;
  }, [currentSave?.id]);
  return setGameSave;
};
