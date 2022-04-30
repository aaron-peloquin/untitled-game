import {URLs} from '@static';
import {useRouter} from 'next/router';
import {useCallback} from 'react';

import {useGetCurrentSave} from './useGetCurrentSave';

import {gameController} from '../../datastores/gameController';


export const useSetCurrentGameSave = (landingPage: string | boolean = URLs.playGame) => {
  const router = useRouter();
  const currentSave = useGetCurrentSave();

  const setGameSave = useCallback((id) => {
    if (currentSave?.gameSaveId) {
      gameController.gameSaves.update(currentSave.gameSaveId, {currentSave: 0});
    }
    gameController.gameSaves.update(id, {currentSave: 1});
    if (landingPage) {
      router.push(landingPage);
    }
    return;
  }, [currentSave?.gameSaveId, landingPage, router]);
  return setGameSave;
};
