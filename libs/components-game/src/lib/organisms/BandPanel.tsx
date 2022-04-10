import {Card} from '@components-layout';
import {useGetBand, useGetLocation, useListMercenariesById} from '@datastore';


import MercenaryList from '../molecules/MercenaryList';

const BandPanel = () => {
  const band = useGetBand();
  const location = useGetLocation(band?.currentLocationId);
  const mercenaries = useListMercenariesById(band?.mercenaryIds);
  console.log({band, mercenaries});

  return <Card heading={`${band?.name}'s Mercenary Band`} layer="2">
    <p>You are visiting <strong>{location?.name}</strong> with <strong>{band?.gold.toLocaleString('en-US') || '0'} gold</strong> in your coffers</p>
    <Card layer="3" heading="Your Mercenaries">
      {mercenaries?.length ? <MercenaryList columns={3} mercenaries={mercenaries} /> : null}
    </Card>
  </Card>;
};

export default BandPanel;
