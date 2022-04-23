import {GridArea, GridTemplate} from '@components-layout';
import {useGetBand, usePayWages} from '@datastore';
import {memo} from 'react';

import {Location} from './../organisms/Location';

import {BandPanel} from '../organisms/BandPanel';
import {BandWages} from '../organisms/BandWages';
import {TopNav} from '../organisms/TopNav';

const gridTemplateAreas = `
"band____"
"location"`;

const GameLayout = memo(() => {
  const band = useGetBand();
  const {wagesDue, bandMercenaries, ...wagesProps} = usePayWages(band);

  return <>
    <TopNav />
    {bandMercenaries && wagesDue ?
    <BandWages bandGold={band?.gold || 0} bandMercenaries={bandMercenaries} {...wagesProps} /> :
    <GridTemplate gridTemplateAreas={gridTemplateAreas}>
      <GridArea name='band____'>
        <BandPanel />
      </GridArea>
      <GridArea name='location'>
        {band?.currentLocationId && <Location locationId={band.currentLocationId} />}
      </GridArea>
    </GridTemplate>}
  </>;
});

GameLayout.displayName = 'GameLayout';
export {GameLayout};
