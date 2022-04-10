import {GridArea, GridTemplate} from '@components-layout';
import {useGetBand} from '@datastore';
import {memo} from 'react';

import Location from './../organisms/Location';

import BandPanel from '../organisms/BandPanel';
import {TopNav} from '../organisms/TopNav';

const gridTemplateAreas = `
"topnav__ topnav__"
"band____ band____"
"location location"`;

export const GameLayout = memo(() => {
  const band = useGetBand();
  return <GridTemplate gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="1fr 3fr">
    <GridArea gridArea='band____'>
      <BandPanel />
    </GridArea>
    <GridArea gridArea='location'>
      {band?.currentLocationId && <Location locationId={band.currentLocationId} />}
    </GridArea>
    <GridArea gridArea='topnav__'>
      <TopNav />
    </GridArea>
  </GridTemplate>;
});
