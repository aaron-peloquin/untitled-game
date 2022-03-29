import {pickArray, pickRange} from '@helper';
import {T_Location, T_generateLocationSig} from 'TS_Location';

export const generateLocation:T_generateLocationSig = (locationNumGenerator, generateMercenary, generateQuest) => (levelMin = 0.6, levelMax = 1.75):T_Location => {
  const locationRangeNumber = pickRange(locationNumGenerator);
  const prefix = pickArray(LOCATION_NAME_PREFIX, locationNumGenerator);
  const locationName = pickArray(LOCATION_NAMES, locationNumGenerator);

  const levelRanges = [
    locationRangeNumber(levelMin, levelMax),
    locationRangeNumber(levelMin, levelMax),
  ].sort();
  const level = locationRangeNumber(levelRanges[0], levelRanges[1]);
  const countQuests = locationRangeNumber(levelRanges[0], levelRanges[1] + 1);
  const countMercenaries = locationRangeNumber(levelRanges[0], levelRanges[1] + 1);
  const mercenaries = [];
  const quests = [];

  for (let index = 0; index < countMercenaries; index++) {
    mercenaries.push(generateMercenary(levelRanges[0], levelRanges[1]));
  }
  for (let index = 0; index < countQuests; index++) {
    quests.push(generateQuest(levelRanges[0], levelRanges[1]));
  }

  const name = `${prefix} ${locationName}`;
  const result:T_Location = {
    level,
    levelRanges,
    mercenaries,
    name,
    quests,
  };
  return result;
};
