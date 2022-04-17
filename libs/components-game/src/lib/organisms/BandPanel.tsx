import {Card, GridArea, GridTemplate, Label, ProgressBar} from '@components-layout';
import {useActionPoints, useGetBand, useGetLocation, useListMercenariesById} from '@datastore';
import {displayNumber} from '@helper';
import {memo} from 'react';


import MercenaryList from '../molecules/MercenaryList';
import {QuestRunner} from '../molecules/QuestRunner';

const BandPanel = memo(() => {
  const band = useGetBand();
  const bandLocation = useGetLocation(band?.currentLocationId);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  const {currentAp, maxAp} = useActionPoints();
  return <Card heading={`${band?.name}'s Mercenary Band`} layer="2">
    <Label htmlFor='band_action-points' text={`Action Poionts (${currentAp}/${maxAp} AP)`} />
    <ProgressBar value={currentAp} max={maxAp} id="band_action-points" />
    <p>You are visiting <strong>{bandLocation?.name}</strong>. Your level {displayNumber(band?.level, 2)} has <strong>{band?.gold.toLocaleString('en-US') || '0'} gold</strong> in your coffers</p>
    <GridTemplate gridTemplateColumns="2fr 1fr">
      <GridArea>
        <Card layer="3" heading="Send Mercenary">
          <QuestRunner />
        </Card>
      </GridArea>
      <GridArea>
        <Card layer="3" heading="Your Mercenaries" style={{maxHeight: '444px', overflowY: 'scroll'}}>
          {bandMercenaries?.length ? <MercenaryList columns={1} canSelect mercenaries={bandMercenaries} showHealthBar /> : null}
        </Card>
      </GridArea>
    </GridTemplate>
  </Card>;
});

BandPanel.displayName = 'BandPanel';
export {BandPanel};
