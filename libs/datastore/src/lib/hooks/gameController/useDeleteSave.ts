import {URLs} from '@static';
import {useRouter} from 'next/router';
import {useCallback} from 'react';

import {gameController} from '../../datastores/gameController';


export const useDeleteSave = (saveId: number, landingPage: string = URLs.mainMenu) => {
  const router = useRouter();
  const deleteSave = useCallback(async () => {
    const gameSave = await gameController.gameSaves.get(saveId);
    if (gameSave?.gameDatastoreName) {
      gameController.gameSaves.delete(saveId);
      indexedDB.deleteDatabase(`untitled-game-${gameSave.gameDatastoreName}`);
    }
    if (landingPage) {
      router.push(landingPage);
    }
  }, [landingPage, router, saveId]);

  return deleteSave;
};
