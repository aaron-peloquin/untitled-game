import {pickArray, pickRange, randomName, seedGenerator} from '@helper';
import {worldGeneration} from '@static';
import * as chanceExport from 'chance';
import Dexie, {Table} from 'dexie';
import * as _ from 'lodash';
import {T_Band} from 'TS_Band';
import {T_KnownQuestTypes, T_TwoItemNumberArray} from 'TS_General';
import {T_Location} from 'TS_Location';
import {T_Mercenary} from 'TS_Mercenary';
import {T_Quest} from 'TS_Quest';

const chance = chanceExport.Chance;

// export gameData datastore, to be initalized by the provider
export class GameDataClass extends Dexie {
  band!: Table<T_Band, number>;
  locations!: Table<T_Location, number>;
  mercenaries!: Table<T_Mercenary, number>;
  quests!: Table<T_Quest, number>;

  constructor(gameDatastoreName: string, name: string, seed: string, locationsToGenerate: number, apPerDay:number) {
    super(`untitled-game-${gameDatastoreName}`);
    this.version(1).stores({
      // Primary key and indexed props
      band: '++bandId, currentLocationId, name, *mercenaryIds',
      locations: '++locationId, *mercenaryIds, *questIds, *relatedLocationIds',
      mercenaries: '++mercenaryId, ethnicity, personality, profession, statsVisible',
      quests: '++questId, questCompletedByMercenaryId, targetEthnicity, targetProfession, type',
    });

    this.on('populate', () => {
      this.numberGenerator = seedGenerator(seed);
      this.rangeGenerator = pickRange(this.numberGenerator);
      this.generate = chance(seed);

      // create band
      console.log({apPerDay});
      const newBand: Omit<T_Band, 'bandId'> = {
        actionPoints: apPerDay * 2,
        currentLocationId: 0,
        daysUntilWages: 5,
        gold: 15,
        level: 1,
        mercenaryIds: [1],
        name,
        seed,
      };

      this.generateMercenary([1, 1], true);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.band.add(newBand);

      // generate world locations
      this.generateGameWorld(locationsToGenerate);
    });
  }

  numberGenerator = Math['random'];
  rangeGenerator = pickRange();
  generate = chance();

  private generateGameWorld = (locationsToGenerate: number) => {
    const locationPromises = [];
    let levelMin: number;
    let levelMax: number;
    for (let index = 0; index < locationsToGenerate; index++) {
      const quarterIndex = index / 1.4;
      levelMin = quarterIndex < 1 ? 1 : quarterIndex;
      levelMax = index * 1.4 || 1.4;
      locationPromises.push(this.generateLocation(levelMin, levelMax));
    }
    Promise.all(locationPromises).then(async () => {
      // set first location as currentLocation
      const firstLocation = await this.locations.orderBy('locationId').first();
      await this.band.update(1, {currentLocationId: firstLocation?.locationId});

      const relationRange = pickRange(this.numberGenerator);
      const locationRelations: Record<string, number[]> = {};
      const locations = await this.locations.toArray();
      const locationIdRange: number[] = [
        locations[0].locationId,
        locations[locations.length - 1].locationId,
      ];

      locations.forEach((location: T_Location) => {
        const locationId = location.locationId;
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
          const combinedRelations = _.uniq([location.locationId, ...currentRelations]);
          _.set(locationRelations, relatedLocationId, combinedRelations);
        });
      });

      const relationPromises = [];
      for (const locationId in locationRelations) {
        if (locationRelations[locationId].length) {
          const locId = parseInt(locationId);
          const relatedLocationIds = locationRelations[locationId].filter((id) => id !== locId).sort((a, b) => a > b ? 0 : -1);
          relationPromises.push(this.locations.update(locId, {relatedLocationIds}));
        }
      }
      await Promise.all(relationPromises);
    });
  };

  private generateLocation = async (levelMin: number, levelMax: number) => {
    const levelRange = [
      this.rangeGenerator(levelMin, levelMax),
      this.rangeGenerator(levelMin, levelMax),
    ].sort((a, b) => a > b ? 0 : -1) as T_TwoItemNumberArray;

    const level = this.rangeGenerator(levelRange[0], levelRange[1]);
    const countQuests = this.rangeGenerator(levelMin < 4 ? 4 : 2, levelMin < 8 ? 15 : 8);
    const countMercenaries = this.rangeGenerator(levelMin < 4 ? 2 : 1, levelMin < 8 ? 6 : 4);
    const mercenaryIds: number[] = [];
    const questIds: number[] = [];

    const name = this.generate.city();
    const location:Omit<T_Location, 'locationId'> = {
      level,
      levelRange,
      mercenaryIds,
      name,
      questIds,
      relatedLocationIds: [],
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.locations.add(location).then(async (locationId) => {
      const waitForMe = [];
      for (let index = 0; index < countMercenaries; index++) {
        waitForMe.push(this.generateMercenary(levelRange).then((mercenaryId: number) => {
          mercenaryIds.push(mercenaryId);
        }));
      }
      for (let index = 0; index < countQuests; index++) {
        waitForMe.push(this.generateQuest(levelRange).then((questId: number) => {
          questIds.push(questId);
        }));
      }
      await Promise.all(waitForMe);
      await this.locations.update(locationId, {mercenaryIds, questIds});
      return locationId;
    });
  };

  private generateMercenary = async (levelRange: T_TwoItemNumberArray, statsVisible = false) => {
    const rangeGenerator = pickRange(this.numberGenerator);

    const level = rangeGenerator(levelRange[0], levelRange[1]);
    const ethnicity = pickArray(worldGeneration.mercenaries.ethnicities, this.numberGenerator);
    const personality = pickArray(worldGeneration.mercenaries.personalities, this.numberGenerator);
    const profession = pickArray(worldGeneration.mercenaries.professions, this.numberGenerator);
    const name = randomName(this.generate);

    const mercenary: Omit<T_Mercenary, 'mercenaryId'> = {
      currentHealth: 9999,
      ethnicity,
      level,
      name,
      personality,
      profession,
      statsVisible,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.mercenaries.add(mercenary);
  };

  private generateQuest = async (levelRange: T_TwoItemNumberArray) => {
    const type = pickArray<T_KnownQuestTypes>(worldGeneration.questTypes, this.numberGenerator);
    const level = parseFloat((this.numberGenerator() * (levelRange[1] - levelRange[0]) + levelRange[0]).toFixed(2));

    const ethnicity = pickArray(worldGeneration.quests.ethnicities, this.numberGenerator);
    const name = randomName(this.generate);

    const profession = pickArray(worldGeneration.quests.professions, this.numberGenerator);

    const quest: Omit<T_Quest, 'questId'> = {
      level,
      questCompletedByMercenaryId: 0,
      targetEthnicity: ethnicity,
      targetName: name,
      targetProfession: profession,
      type,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.quests.add(quest);
  };
}
