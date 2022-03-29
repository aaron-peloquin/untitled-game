import {T_Location} from 'TS_Location';
import MercenaryList from '../molecules/MercenaryList';
import QuestList from '../molecules/QuestList';

type Props = {
  location: T_Location
}
const Location: React.FC<Props> = ({location}) => {
  return <>
    You're at the local tavern in <strong>{location?.name}</strong>, there are both recruits and citizens with quests available here. This a level {location?.levelRanges[0]} to {location?.levelRanges[1]} tavern.
    <h3>Mercenaries for hire</h3>
    {location?.mercenaries.length ? <MercenaryList mercenaries={location?.mercenaries} /> : <span>No mercenaries for hire</span>}
    <h3>Quests</h3>
    {location?.quests.length ? <QuestList quests={location?.quests} /> : <span>No quests available</span>}

  </>;
};

export default Location;
