import {GridArea, GridTemplate} from '@components-layout';
import {contextSave, useCurrentSave} from '@helper';
import {createGameWorld} from '@location';
import {memo, useEffect} from 'react';

import BandPanel from '../organisms/BandPanel';
import Location from '../organisms/Location';
import {TopNav} from '../organisms/TopNav';

const SaveProvider = contextSave.Provider;

const gridTemplateAreas = `
"topnav__ topnav__"
"band____ band____"
"location location"`;

export const GameLayout = memo(() => {
  const save = useCurrentSave();
  useEffect(() => createGameWorld(save), [save]);
  return <SaveProvider value={save?.id || 0}>
    <div>
      <GridTemplate gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="1fr 3fr">
        <GridArea gridArea='band____'>
          <BandPanel />
        </GridArea>
        <GridArea gridArea='location'>
          {save?.currentLocation && <Location locationId={save?.currentLocation} />}
        </GridArea>
        <GridArea gridArea='topnav__'>
          <TopNav />
        </GridArea>
      </GridTemplate>
    </div>
  </SaveProvider>;
});
