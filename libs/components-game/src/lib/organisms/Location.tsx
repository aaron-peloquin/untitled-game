import {Card, Tab, Tabs} from '@components-layout';
import {useGetLocation, useListLocationsById, useListMercenariesById, useListQuestsById} from '@datastore';
import {memo} from 'react';

import MercenaryList from '../molecules/MercenaryList';
import QuestList from '../molecules/QuestList';
import RelatedLocationsList from '../molecules/RelatedLocationsList';

type Props = {
  locationId: number
}
export const Location: React.FC<Props> = memo(({locationId}) => {
  const location = useGetLocation(locationId);
  const locationMercenaries = useListMercenariesById(location?.mercenaryIds);
  const locationQuests = useListQuestsById(location?.questIds);
  const relatedLocations = useListLocationsById(location?.relatedLocationIds);
  console.log({locationMercenaries, locationQuests, relatedLocations});

  return <Card heading={location?.name} layer="2">
    You're at the local tavern, there are both recruits and citizens with quests available here. This a level {location?.levelRange?.[0]} to {location?.levelRange?.[1]} tavern.
    <Tabs layer="3" defaultTab='quests'>
      <Tab name="Mercenary" id="mercenaries">
        <Card heading='Mercenaries' layer="3">
          {locationMercenaries?.length ? <MercenaryList canHire mercenaries={locationMercenaries} /> : <span>No mercenaries for hire</span>}
        </Card>
      </Tab>
      <Tab name="Available Quests" id="quests">
        <Card heading='Available Quests' layer="3">
          {locationQuests?.length ? <QuestList quests={locationQuests} /> : <span>No quests available</span>}
        </Card>
      </Tab>
      <Tab name="Nearby Locations" id="nearby-locations">
        <Card heading="Travel" layer="3">
          {relatedLocations?.length ? <RelatedLocationsList locations={relatedLocations} /> : <span>End of the road?</span>}
        </Card>
      </Tab>
    </Tabs>
  </Card>;
});

export default memo(Location);
