import {useCurrentSave} from '@helper';
import {useEffect} from 'react';

import BandPanel from '../organisms/BandPanel';
import Location from '../organisms/Location';


export const GameLayout = () => {
  const save = useCurrentSave();
  useEffect(() => {
    if (save) {
      if (!save.currentLocation) {
        // generateWorld
      };
    }
  });
  return (
    <div>
      <h1>A Untitled Game</h1>
      <fieldset>
        <legend><h2>Your Band</h2></legend>
        <BandPanel />
      </fieldset>
      <fieldset>
        <legend><h2>Location</h2></legend>
        <Location location={save?.currentLocation} />
      </fieldset>
      <fieldset>
        <legend><h2>Travel</h2></legend>
        {/** Leave this location */}
      </fieldset>
    </div>
  );
};
