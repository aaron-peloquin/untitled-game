import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {db} from '../db';

export const useDataLocation = (locationId: number) => {
  const location = useLiveQuery(() => IS_SSR ? undefined : db.locations.where('id').equals(locationId).first(), [locationId]);

  const mercenaries = useLiveQuery(() => IS_SSR ? [] : db.mercenaries.where('id').anyOf(location?.mercenaries || []).toArray(), [location?.mercenaries]);
  const quests = useLiveQuery(() => IS_SSR ? [] : db.quests.where('id').anyOf(location?.quests || []).toArray(), [location?.quests]);
  const relatedLocations = useLiveQuery(() => IS_SSR ? [] : db.locations.where('id').anyOf(location?.relatedLocations || []).toArray(), [location?.relatedLocations]);
  return {
    ...location,
    mercenaries,
    quests,
    relatedLocations,
  };
};
