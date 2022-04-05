import {db, pickArray, pickRange} from '@helper';
import {generateMercenary} from '@mercenary';
import {generateQuest} from '@quest';
import {LOCATION_NAMES, LOCATION_NAME_PREFIX} from '@static';
import {T_TwoItemNumberArray} from 'TS_General';
import {T_Location, T_generateLocationSig} from 'TS_Location';

export const generateLocation:T_generateLocationSig = (numberGenerator, gameSaveId, levelMin = 0.6, levelMax = 1.75) => {
  const locationRangeNumber = pickRange(numberGenerator);
  const prefix = pickArray(LOCATION_NAME_PREFIX, numberGenerator);
  const locationName = pickArray(LOCATION_NAMES, numberGenerator);

  const levelRanges = [
    locationRangeNumber(levelMin, levelMax),
    locationRangeNumber(levelMin, levelMax),
  ].sort((a, b) => a > b ? 0 : -1) as T_TwoItemNumberArray;

  const level = locationRangeNumber(levelRanges[0], levelRanges[1]);
  const countQuests = locationRangeNumber(2, 5);
  const countMercenaries = locationRangeNumber(levelMin < 4 ? 2 : 1, levelMin < 8 ? 6 : 4);
  const mercenaries: number[] = [];
  const quests: number[] = [];

  const name = `${prefix} ${locationName}`;
  const location:T_Location = {
    gameSaveId,
    level,
    levelRanges,
    mercenaries,
    name,
    quests,
    relatedLocations: [],
  };
  return db.locations.add(location).then(async (id) => {
    const waitForMe = [];
    for (let index = 0; index < countMercenaries; index++) {
      waitForMe.push(generateMercenary({gameSaveId, levelRanges, numberGenerator}).catch((e: Error)=> console.error('error merc', e)).then((mercId: number) => {
        mercenaries.push(mercId);
      }));
      ;
    }
    for (let index = 0; index < countQuests; index++) {
      waitForMe.push(generateQuest({gameSaveId, levelRanges, numberGenerator}).catch((e: Error)=> console.log('error making quest', e)).then((questId: number) => {
        quests.push(questId);
      }));
    }
    await Promise.all(waitForMe);
    await db.locations.update(id, {mercenaries, quests});
    return id;
  });
};
