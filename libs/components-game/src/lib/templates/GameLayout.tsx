import {GridArea, GridTemplate} from '@components-layout';
import {useGetBand} from '@datastore';
import {memo} from 'react';

import BandPanel from '../organisms/BandPanel';
// import Location from '../organisms/Location';
import {TopNav} from '../organisms/TopNav';


const gridTemplateAreas = `
"topnav__ topnav__"
"band____ band____"
"location location"`;

export const GameLayout = memo(() => {
  return <GridTemplate gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="1fr 3fr">
    <GridArea gridArea='band____'>
      <BandPanel />
    </GridArea>
    <GridArea gridArea='location'>
      {/* {save?.currentLocation && <Location locationId={save?.currentLocation} />} */}
    </GridArea>
    <GridArea gridArea='topnav__'>
      <TopNav />
    </GridArea>
  </GridTemplate>;
});
