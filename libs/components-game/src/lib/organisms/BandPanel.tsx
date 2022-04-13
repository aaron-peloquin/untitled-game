import {Card} from '@components-layout';
import {useGetBand, useGetLocation, useListMercenariesById} from '@datastore';
import {memo} from 'react';


import MercenaryList from '../molecules/MercenaryList';
import {QuestRunner} from '../molecules/QuestRunner';

const BandPanel = memo(() => {
  const band = useGetBand();
  const bandLocation = useGetLocation(band?.currentLocationId);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

  return <Card heading={`${band?.name}'s Mercenary Band`} layer="2">
    <p>You are visiting <strong>{bandLocation?.name}</strong> with <strong>{band?.gold.toLocaleString('en-US') || '0'} gold</strong> in your coffers</p>
    <Card layer="3" heading="Send Mercenary">
      <QuestRunner />
    </Card>
    <Card layer="3" heading="Your Mercenaries">
      {bandMercenaries?.length ? <MercenaryList columns={3} canSelect mercenaries={bandMercenaries} showHealthBar /> : null}
    </Card>
  </Card>;
});

BandPanel.displayName = 'BandPanel';
export {BandPanel};
