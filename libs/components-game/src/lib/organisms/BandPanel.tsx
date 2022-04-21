import {Button, Card, GridArea, GridTemplate, Label, ProgressBar} from '@components-layout';
import {useRest, useGetBand, useGetLocation, useListMercenariesById} from '@datastore';
import {displayNumber} from '@helper';
import {memo, useCallback, useState} from 'react';
import {T_QuestResults} from 'TS_Quest';

import MercenaryList from '../molecules/MercenaryList';
import {QuestResults} from '../molecules/QuestResults';
import {QuestRunner} from '../molecules/QuestRunner';

const BandPanel = memo(() => {
  const band = useGetBand();
  const bandLocation = useGetLocation(band?.currentLocationId);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  const {currentAp, maxAp, restoreAp, restoreApAmount} = useRest(band);

  const [questResults, setQuestResults] = useState<T_QuestResults>();
  const clearQuestResults = useCallback(() => {
    setQuestResults(undefined);
  }, []);


  return questResults ?
    <QuestResults clearQuestResults={clearQuestResults} questResults={questResults} /> :
    <Card heading={`${band?.name}'s Mercenary Band`} layer="2">
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
      <GridTemplate>
        <GridArea>
          <Card layer="3" heading="Send Mercenary on a Quest">
            <QuestRunner setQuestResults={setQuestResults} />
          </Card>
        </GridArea>
        <GridArea>
          <Card layer="3" heading={`Your Mercenaries (${bandMercenaries?.length}/${Math.round((band?.level || 1) + 1)})`}>
            {bandMercenaries?.length ? <MercenaryList columns={3} canSelect mercenaries={bandMercenaries} showHealthBar /> : null}
          </Card>
        </GridArea>
      </GridTemplate>
    </Card>;
});

BandPanel.displayName = 'BandPanel';
export {BandPanel};
