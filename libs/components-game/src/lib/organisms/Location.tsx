import {Card, Tab, Tabs} from '@components-layout';
import {useDataLocation} from '@helper';
import {memo, useState} from 'react';

import MercenaryList from '../molecules/MercenaryList';
import QuestList from '../molecules/QuestList';
import RelatedLocationsList from '../molecules/RelatedLocationsList';

type Props = {
  locationId: number
}
const Location: React.FC<Props> = ({locationId}) => {
  const location = useDataLocation(locationId);
  const [showTab, setShowTab] = useState(false);
  const [sortTab, setSortTab] = useState(2);

  return <Card heading={location.name} layer="2">
    You're at the local tavern, there are both recruits and citizens with quests available here. This a level {location?.levelRanges?.[0]} to {location?.levelRanges?.[1]} tavern.
    <br /><button onClick={() => setSortTab(sortTab === 5 ? 2 : 5)}>Sort Quest Tab</button>
    <br /><button onClick={() => setShowTab(!showTab)}>Toggle Extra Tab</button>
    <Tabs layer="3">
      <Tab name="Mercenary" id='merc' sort={1}>
        <Card heading='Mercenaries' layer="3">
          {location.mercenaries?.length ? <MercenaryList canHire mercenaries={location.mercenaries} /> : <span>No mercenaries for hire</span>}
        </Card>
      </Tab>
      <Tab name="Available Quests" id="quests" sort={sortTab}>
        <Card heading='Available Quests' layer="3">
          {location.quests?.length ? <QuestList quests={location.quests} /> : <span>No quests available</span>}
        </Card>
      </Tab>
      {showTab && <Tab name="Another Tab" id="another" sort={3}>
        Some other tab contents
      </Tab>}
      <Tab name="Nearby Locations" id="locz" sort={4}>
        <Card heading='Travel' layer="3">
          {location.relatedLocations?.length ? <RelatedLocationsList locations={location.relatedLocations} /> : <span>End of the road?</span>}
        </Card>
      </Tab>
    </Tabs>
  </Card>;
};

export default memo(Location);
