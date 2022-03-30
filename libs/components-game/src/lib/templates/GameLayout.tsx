import {contextSave, db, seedGenerator, useCurrentSave} from '@helper';
import {generateLocation} from '@location';
import {memo, useEffect} from 'react';

import BandPanel from '../organisms/BandPanel';
import Location from '../organisms/Location';

const SaveProvider = contextSave.Provider;

export const GameLayout = memo(() => {
  const save = useCurrentSave();
  useEffect(() => {
    const generateWorld = async () => {
      if (save) {
        if (!save.currentLocation) {
          // generateWorld
          const numberGenerator = seedGenerator(save.seed);
          let levelMin;
          let levelMax;
          for (let index = 0; index < 44; index++) {
            const quarterIndex = index / 1.4;
            levelMin = quarterIndex < 1 ? 1 : quarterIndex;
            levelMax = index * 1.4 || 1.4;
            const locationId = await generateLocation(numberGenerator, save.id || 0, levelMin, levelMax);
            if (index === 0) {
              db.gameSaves.update(save.id || [], {currentLocation: locationId});
            }
          }
        };
      }
    };
    generateWorld();
  }, [save]);
  return <SaveProvider value={save?.id || 0}>
    <div>
      <h1>A Untitled Game</h1>
      <fieldset>
        <legend><h2>Your Band</h2></legend>
        <BandPanel />
      </fieldset>
      <fieldset>
        <legend><h2>Location</h2></legend>
        {save?.currentLocation && <Location locationId={save?.currentLocation} />}
      </fieldset>
      <fieldset>
        <legend><h2>Travel</h2></legend>
        {/** Leave this location */}
      </fieldset>
    </div>
  </SaveProvider>;
});
