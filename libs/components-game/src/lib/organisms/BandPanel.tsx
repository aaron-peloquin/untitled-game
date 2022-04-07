import {Card} from '@components-layout';
import {useBand} from '@helper';


import MercenaryList from '../molecules/MercenaryList';

const BandPanel = () => {
  const band = useBand();

  return <Card heading={`${band.name}'s Mercenary Band`} layer="2">
    <p>You are visiting <strong>{band.location?.name}</strong> with <strong>{band.gold.toLocaleString('en-US')} gold</strong> in your coffers</p>
    <Card layer="3" heading="Your Mercenaries">
      {band.mercenaries.length ? <MercenaryList columns={3} mercenaries={band.mercenaries} /> : null}
    </Card>
  </Card>;
};

export default BandPanel;
