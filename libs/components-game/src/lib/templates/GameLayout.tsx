import {contextSave, db, pickRange, seedGenerator, useCurrentSave} from '@helper';
import {generateLocation} from '@location';
import _ from 'lodash';
import {memo, useEffect} from 'react';

import BandPanel from '../organisms/BandPanel';
import Location from '../organisms/Location';

const SaveProvider = contextSave.Provider;

export const GameLayout = memo(() => {
  const save = useCurrentSave();
  useEffect(() => {
    const generateWorld = async () => {
      if (save) {
        const saveId = save.id || 0;
        if (!save.currentLocation) {
          const numberGenerator = seedGenerator(save.seed);
          let levelMin;
          let levelMax;
          const locationPromises = [];
          for (let index = 0; index < 44; index++) {
            const quarterIndex = index / 1.4;
            levelMin = quarterIndex < 1 ? 1 : quarterIndex;
            levelMax = index * 1.4 || 1.4;
            const locationId = await generateLocation(numberGenerator, saveId, levelMin, levelMax);
            if (index === 0) {
              locationPromises.push(db.gameSaves.update(save.id || [], {currentLocation: locationId}));
            }
          }
          Promise.all(locationPromises).then(async () => {
            const relationRange = pickRange(numberGenerator);
            const locationRelations: Record<string, number[]> = {};
            const locations = await db.locations.where('gameSaveId').equals(saveId).toArray();
            const locationIdRange = [
              locations[0].id,
              locations[locations.length - 1].id,
            ];
            locations.forEach((location) => {
              let lowRange = location.id - 2;
              let highRange = location.id + 1.75;
              if (lowRange < locationIdRange[0]) {
                highRange += Math.abs(locationIdRange[0] - lowRange);
                lowRange = locationIdRange[0];
              } else if (highRange > locationIdRange[1]) {
                lowRange -= locationIdRange[1] - location.id;
                highRange = locationIdRange[1];
              }
              const nearbyLocations = [
                relationRange(lowRange, highRange, 1, 0),
                relationRange(lowRange, highRange, 1, 0),
                relationRange(lowRange, highRange, 1, 0),
              ];
              const currentRelations = _.get(locationRelations, location.id, []);
              const combinedRelations = _.uniq([...nearbyLocations, ...currentRelations]);
              _.set(locationRelations, location.id, combinedRelations);
              nearbyLocations.forEach((relatedLocationId) => {
                const currentRelations = _.get(locationRelations, relatedLocationId, []);
                const combinedRelations = _.uniq([location.id, ...currentRelations]);
                _.set(locationRelations, relatedLocationId, combinedRelations);
              });
            });
            const relationPromises = [];
            for (const locationId in locationRelations) {
              if (locationRelations[locationId].length) {
                const locId = parseInt(locationId);
                const relatedLocations = locationRelations[locationId].filter((id) => id !== locId).sort((a, b) => a > b ? 0 : -1);
                const boop = db.locations.update(locId, {relatedLocations}).then((result) => console.log('update result:', result));
                relationPromises.push(boop);
              }
            }
            await Promise.all(relationPromises);
          });
        }
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
    </div>
  </SaveProvider>;
});
