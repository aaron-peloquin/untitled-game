import {URLs} from '@static';
import {NextRouter} from 'next/router';
import {useCallback} from 'react';

import {db} from '../db';

export const useDeleteSave = (saveId: number, router: NextRouter) => {
  return useCallback(() => {
    db.gameSaves.delete(saveId);
    db.locations.where('gameSaveId').equals(saveId).delete();
    db.mercenaries.where('gameSaveId').equals(saveId).delete();
    db.quests.where('gameSaveId').equals(saveId).delete();
    router.push(URLs.mainMenu);
  }, [router, saveId]);
};
