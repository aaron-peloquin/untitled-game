import {db} from '@helper';
import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import MercenaryList from '../molecules/MercenaryList';
import QuestList from '../molecules/QuestList';


type Props = {
  locationId: number
}
const Location: React.FC<Props> = ({locationId}) => {
  const location = useLiveQuery(() => IS_SSR ? undefined : db.locations.where('id').equals(locationId).first(), [locationId]);

  const mercenaries = useLiveQuery(() => IS_SSR ? [] : db.mercenaries.where('id').anyOf(location?.mercenaries || []).toArray(), [location?.mercenaries]);
  const quests = useLiveQuery(() => IS_SSR ? [] : db.quests.where('id').anyOf(location?.quests || []).toArray(), [location?.quests]);

  return <>
    You're at the local tavern in <strong>{location?.name}</strong>, there are both recruits and citizens with quests available here. This a level {location?.levelRanges[0]} to {location?.levelRanges[1]} tavern.
    <h3>Mercenaries for hire</h3>
    {mercenaries?.length ? <MercenaryList mercenaries={mercenaries} /> : <span>No mercenaries for hire</span>}
    <h3>Available Quests</h3>
    {quests?.length ? <QuestList quests={quests} /> : <span>No quests available</span>}

  </>;
};

export default Location;
