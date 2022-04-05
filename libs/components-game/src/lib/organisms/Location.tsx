import {Card} from '@components-layout';
import {useDataLocation} from '@helper';
import {memo} from 'react';

import MercenaryList from '../molecules/MercenaryList';
import QuestList from '../molecules/QuestList';
import RelatedLocationsList from '../molecules/RelatedLocationsList';


type Props = {
  locationId: number
}
const Location: React.FC<Props> = ({locationId}) => {
  const location = useDataLocation(locationId);

  return <Card heading={location.name} layer="2">
    You're at the local tavern, there are both recruits and citizens with quests available here. This a level {location?.levelRanges?.[0]} to {location?.levelRanges?.[1]} tavern.
    <Card heading='Mercenaries' layer="3">
      {location.mercenaries?.length ? <MercenaryList canHire mercenaries={location.mercenaries} /> : <span>No mercenaries for hire</span>}
    </Card>
    <Card heading='Available Quests' layer="3">
      {location.quests?.length ? <QuestList quests={location.quests} /> : <span>No quests available</span>}
    </Card>
    <Card heading='Travel' layer="3">
      {location.relatedLocations?.length ? <RelatedLocationsList locations={location.relatedLocations} /> : <span>End of the road?</span>}
    </Card>
  </Card>;
};

export default memo(Location);
