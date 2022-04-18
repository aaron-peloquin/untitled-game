import {Button, Card, GridArea, GridTemplate, Label, ProgressBar} from '@components-layout';
import {useActionPoints, useGetBand, useGetLocation, useListMercenariesById} from '@datastore';
import {displayNumber} from '@helper';
import {useGameData} from 'libs/datastore/src/lib/hooks/gameController/useGameData';
import {memo, useCallback} from 'react';

import MercenaryList from '../molecules/MercenaryList';
import {QuestRunner} from '../molecules/QuestRunner';

const MERCENARY_AREA_OVERVIEW = `
"description description"
"ap_________ rest_______"`;

const BandPanel = memo(() => {
  const band = useGetBand();
  const bandLocation = useGetLocation(band?.currentLocationId);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  const {currentAp, maxAp, changeActionPoints} = useActionPoints();
  const restoreApAmount = maxAp - currentAp;
  const gameSave = useGameData();
  const restoreAp = useCallback(() => {
    if (gameSave?.dataStore) {
      changeActionPoints(restoreApAmount);
      gameSave.dataStore.band.update(band?.bandId || 1, {daysUntilWages: (band?.daysUntilWages || 1) - 1});
    }
  }, [band?.bandId, band?.daysUntilWages, changeActionPoints, gameSave.dataStore, restoreApAmount]);

  return <Card heading={`${band?.name}'s Mercenary Band`} layer="2">
    <Card layer="3" heading="Overview">
      <GridTemplate columns={3} gridGap="8px">
        <GridArea>
          <p>You are visiting <strong>{bandLocation?.name}</strong>. Your band is level {displayNumber(band?.level)} ({displayNumber(band?.level, 2)}) has <strong>{band?.gold.toLocaleString('en-US') || '0'} gold</strong> in your coffers</p>
        </GridArea>
        <GridArea>
          <Label htmlFor='band_action-points' text={`Action Poionts (${currentAp}/${maxAp} AP)`} />
          <ProgressBar value={currentAp} max={maxAp} id="band_action-points" />
        </GridArea>
        <GridArea>
          <Button onClick={restoreAp} text={`Rest (regain ${restoreApAmount > 0 ? restoreApAmount : 0} AP)`} />
          <p><strong>{band?.daysUntilWages}</strong> Days until wages are due</p>
        </GridArea>
      </GridTemplate>
    </Card>
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
