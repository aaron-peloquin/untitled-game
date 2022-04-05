import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {useCurrentSave} from './useCurrentSave';

import {db} from '../db';

export const useBand = () => {
  const gameSave = useCurrentSave();

  const mercenaryIds = gameSave?.band.mercenaries || [];
  const mercenaries = useLiveQuery(() => IS_SSR ? [] : db.mercenaries.where('id').anyOf(mercenaryIds).toArray(), [mercenaryIds]) || [];

  const currentLocationId = gameSave?.currentLocation || [];
  const location = useLiveQuery(() => IS_SSR ? undefined : db.locations.where('id').anyOf(currentLocationId).first(), [currentLocationId]);

  const response = {
    gold: gameSave?.band?.gold || 0,
    location,
    mercenaries,
    name: gameSave?.band?.name || 'Loading Band...',
  };
  return response;
};
