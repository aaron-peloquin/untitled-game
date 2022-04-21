import {Card, GridArea, GridTemplate} from '@components-layout';
import {useGetBand, useGetLocation, useListMercenariesById} from '@datastore';
import { displayNumber } from '@helper';
import {memo, useCallback, useState} from 'react';
import {T_QuestResults} from 'TS_Quest';

import {BandRest} from '../molecules/BandRest';

import MercenaryList from '../molecules/MercenaryList';
import {QuestResults} from '../molecules/QuestResults';
import {QuestRunner} from '../molecules/QuestRunner';

const BandPanel = memo(() => {
  const band = useGetBand();
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  const bandLocation = useGetLocation(band?.currentLocationId);

  const [questResults, setQuestResults] = useState<T_QuestResults>();
  const clearQuestResults = useCallback(() => {
    setQuestResults(undefined);
  }, []);


  return questResults ?
    <QuestResults clearQuestResults={clearQuestResults} questResults={questResults} /> :
    <Card heading={`${band?.name}'s Mercenary Band`} layer="2">
      <Card layer="3">
        <p>You are visiting <strong>{bandLocation?.name}</strong>. Your band is level {displayNumber(band?.level)} ({displayNumber(band?.level, 2)}) has <strong>{band?.gold.toLocaleString('en-US') || '0'} gold</strong> in your coffers</p>
      </Card>
      <Card layer="3" heading="Overview">
        <BandRest band={band} />
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
