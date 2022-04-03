import {db, pickRange, seedGenerator} from '@helper';
import * as _ from 'lodash';
import {T_GameSave} from 'TS_General';
import {T_Location} from 'TS_Location';

import {generateLocation} from './generateLocation';

type T_createGameWorldSig = (save?: T_GameSave) => void
export const createGameWorld:T_createGameWorldSig = (save) => {
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
            locationPromises.push(db.gameSaves.update(save.id || 0, {currentLocation: locationId}));
          }
        }
        Promise.all(locationPromises).then(async () => {
          const relationRange = pickRange(numberGenerator);
          const locationRelations: Record<string, number[]> = {};
          const locations = await db.locations.where('gameSaveId').equals(saveId).toArray();
          const locationIdRange: number[] = [
            locations[0].id || 0,
            locations[locations.length - 1].id || 0,
          ];
          locations.forEach((location: T_Location) => {
            const locationId = location.id || 0;
            let lowRange = locationId - 2;
            let highRange = locationId + 1.75;
            if (lowRange < locationIdRange[0]) {
              highRange += Math.abs(locationIdRange[0] - lowRange);
              lowRange = locationIdRange[0];
            } else if (highRange > locationIdRange[1]) {
              lowRange -= locationIdRange[1] - locationId;
              highRange = locationIdRange[1];
            }
            const nearbyLocations = [
              relationRange(lowRange, highRange, 1, 0),
              relationRange(lowRange, highRange, 1, 0),
              relationRange(lowRange, highRange, 1, 0),
            ];
            const currentRelations = _.get(locationRelations, locationId, []);
            const combinedRelations = _.uniq([...nearbyLocations, ...currentRelations]);
            _.set(locationRelations, locationId, combinedRelations);
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
};
