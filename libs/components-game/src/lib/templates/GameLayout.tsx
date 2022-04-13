import {GridArea, GridTemplate} from '@components-layout';
import {useGetBand} from '@datastore';
import {memo} from 'react';

import {Location} from './../organisms/Location';

import {BandPanel} from '../organisms/BandPanel';
import {TopNav} from '../organisms/TopNav';

const gridTemplateAreas = `
"band____"
"location"`;

const GameLayout = memo(() => {
  const band = useGetBand();
  return <>
    <TopNav />
    <GridTemplate gridTemplateAreas={gridTemplateAreas}>
      <GridArea name='band____'>
        <BandPanel />
      </GridArea>
      <GridArea name='location'>
        {band?.currentLocationId && <Location locationId={band.currentLocationId} />}
      </GridArea>
    </GridTemplate></>;
});

GameLayout.displayName = 'GameLayout';
export {GameLayout};
