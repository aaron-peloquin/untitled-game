import {Card, GridArea, GridTemplate} from '@components-layout';
import {contextSave, useCurrentSave} from '@helper';
import {createGameWorld} from '@location';
import _ from 'lodash';
import {memo, useEffect} from 'react';

import BandPanel from '../organisms/BandPanel';
import Location from '../organisms/Location';
import {SideNav} from '../organisms/SideNav';

const SaveProvider = contextSave.Provider;

const gridTemplateAreas = `
"sidenav_ band____"
"location location"`;

export const GameLayout = memo(() => {
  const save = useCurrentSave();
  useEffect(() => createGameWorld(save), [save]);
  return <SaveProvider value={save?.id || 0}>
    <div>
      <GridTemplate gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="1fr 3fr">
        <GridArea gridArea='band____'>
          <Card heading="Mercenary Band" layer="2">
            <BandPanel />
          </Card>
        </GridArea>
        <GridArea gridArea='location'>
          {save?.currentLocation && <Card heading='Location' layer="2">
            <Location locationId={save?.currentLocation} />
          </Card>}
        </GridArea>
        <GridArea gridArea='sidenav_'>
          <SideNav />
        </GridArea>
      </GridTemplate>
    </div>
  </SaveProvider>;
});
