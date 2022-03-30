import {db, pickArray, pickRange} from '@helper';
import {generateMercenary} from '@mercenary';
import {generateQuest} from '@quest';
import {LOCATION_NAMES, LOCATION_NAME_PREFIX} from '@static';
import {T_Location, T_generateLocationSig} from 'TS_Location';

export const generateLocation:T_generateLocationSig = (numberGenerator, gameSaveId, levelMin = 0.6, levelMax = 1.75) => {
  const locationRangeNumber = pickRange(numberGenerator);
  const prefix = pickArray(LOCATION_NAME_PREFIX, numberGenerator);
  const locationName = pickArray(LOCATION_NAMES, numberGenerator);

  const levelRanges = [
    locationRangeNumber(levelMin, levelMax),
    locationRangeNumber(levelMin, levelMax),
  ].sort((a, b) => a > b ? 0 : -1);
  const level = locationRangeNumber(levelRanges[0], levelRanges[1]);
  console.log(`${Math.round(level)}:`, levelRanges, [levelMin.toFixed(2), levelMax.toFixed(2)] );
  const countQuests = locationRangeNumber(levelRanges[0], levelRanges[1] + 1);
  const countMercenaries = locationRangeNumber(levelRanges[0], levelRanges[1] + 1);
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
  };
  return db.locations.add(location).then(async (id) => {
    for (let index = 0; index < countMercenaries; index++) {
      const mercId = await generateMercenary(numberGenerator, gameSaveId, levelRanges[0], levelRanges[1]).catch((e)=> console.log('error merc', e));
      mercenaries.push(mercId);
    }
    for (let index = 0; index < countQuests; index++) {
      const questId = await generateQuest(numberGenerator, gameSaveId, levelRanges[0], levelRanges[1]).catch((e)=> console.log('error merc', e));
      quests.push(questId);
    }
    db.locations.update(id, {mercenaries, quests});
    return id;
  });
};
