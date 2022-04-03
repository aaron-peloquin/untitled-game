import {GridArea, GridTemplate} from '@components-layout';
import {contextSave, useCurrentSave} from '@helper';
import {createGameWorld} from '@location';
import _ from 'lodash';
import {memo, useEffect} from 'react';

import BandPanel from '../organisms/BandPanel';
import Location from '../organisms/Location';

const SaveProvider = contextSave.Provider;

const gridTemplateAreas = `
"band"
"another"
"location"
`;

export const GameLayout = memo(() => {
  const save = useCurrentSave();
  useEffect(() => createGameWorld(save), [save]);
  return <SaveProvider value={save?.id || 0}>
    <div>
      <h1>An Untitled Game</h1>
      <GridTemplate gridTemplateAreas={gridTemplateAreas}>
        <GridArea gridArea='band'>
          <legend><h2>Your Band</h2></legend>
          <BandPanel />
        </GridArea>
        <GridArea gridArea='location'>
          <legend><h2>Location</h2></legend>
          {save?.currentLocation && <Location locationId={save?.currentLocation} />}
        </GridArea>
        <GridArea gridArea='another'>
          <legend><h2>Something else</h2></legend>
          <p>Weeeeee</p>
        </GridArea>
      </GridTemplate>
    </div>
  </SaveProvider>;
});
