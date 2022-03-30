import {useLiveQuery} from 'dexie-react-hooks';

import {db} from '../db';
import {useCurrentSave} from '../gameSaves/useCurrentSave';

export const useBandMercenaries = () => {
  const gameSave = useCurrentSave();
  const mercenaries = gameSave?.band.mercenaries || [];
  return useLiveQuery(() => db.mercenaries.where('id').anyOf(mercenaries).toArray(), [mercenaries]);
};
