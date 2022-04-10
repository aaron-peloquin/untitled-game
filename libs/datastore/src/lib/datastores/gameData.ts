import {pickArray, pickRange, seedGenerator} from '@helper';
import {LOCATION_NAMES, LOCATION_NAME_PREFIX, QUEST_TYPE, worldGeneration} from '@static';
import * as chance from 'chance';
import Dexie, {Table} from 'dexie';
import _ = require('lodash');
import {T_Band} from 'TS_Band';
import {T_TwoItemNumberArray} from 'TS_General';
import {T_Location} from 'TS_Location';
import {T_Mercenary} from 'TS_Mercenary';
import {T_Quest} from 'TS_Quest';

const LOCATIONS_PER_GAME = 44;

const generate = chance();


// export gameData datastore, to be initalized by the provider
export class GameDataClass extends Dexie {
  band!: Table<T_Band, number>;
  locations!: Table<T_Location, number>;
  mercenaries!: Table<T_Mercenary, number>;
  quests!: Table<T_Quest, number>;

  constructor(gameDatastoreName: string, name: string, seed: string) {
    super(`untitled-game-${gameDatastoreName}`);
    this.version(1).stores({
      // Primary key and indexed props
      band: '++bandId, name, currentSave',
      locations: '++locationId, *mercenaries, *quests, *relatedLocationIds',
      mercenaries: '++mercenaryId, ethnicity, personality, profession, statsVisible',
      quests: '++questId, targetEthnicity, targetProfession, type',
    });

    this.on('populate', () => {
      // create band
      const newBand: Omit<T_Band, 'bandId'> = {
        currentLocationId: 0,
        gold: 15,
        mercenaryIds: [],
        name,
        seed,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.band.add(newBand);

      // generate world locations
      this.generateGameWorld(seed);
    });
  }

  numberGenerator = Math['random'];
  rangeGenerator = pickRange();

  private generateGameWorld = (seed: string) => {
    const locationPromises = [];
    this.numberGenerator = seedGenerator(seed);
    this.rangeGenerator = pickRange(this.numberGenerator);
    let levelMin: number;
    let levelMax: number;

    for (let index = 0; index < LOCATIONS_PER_GAME; index++) {
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
    const prefix = pickArray(LOCATION_NAME_PREFIX, this.numberGenerator);
    const locationName = pickArray(LOCATION_NAMES, this.numberGenerator);

    const levelRange = [
      this.rangeGenerator(levelMin, levelMax),
      this.rangeGenerator(levelMin, levelMax),
    ].sort((a, b) => a > b ? 0 : -1) as T_TwoItemNumberArray;

    const level = this.rangeGenerator(levelRange[0], levelRange[1]);
    const countQuests = this.rangeGenerator(2, 5);
    const countMercenaries = this.rangeGenerator(levelMin < 4 ? 2 : 1, levelMin < 8 ? 6 : 4);
    const mercenaryIds: number[] = [];
    const questIds: number[] = [];

    const name = generate.city(); // `${prefix} ${locationName}`;
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

  private generateMercenary = async (levelRange: T_TwoItemNumberArray) => {
    const rangeGenerator = pickRange(this.numberGenerator);

    const level = rangeGenerator(levelRange[0], levelRange[1]);
    const ethnicity = pickArray(worldGeneration.mercenaries.ethnicities, this.numberGenerator);
    const personality = pickArray(worldGeneration.mercenaries.personalities, this.numberGenerator);
    const profession = pickArray(worldGeneration.mercenaries.professions, this.numberGenerator);
    const name = generate.name();

    const mercenary: Omit<T_Mercenary, 'mercenaryId'> = {
      currentHealth: -1,
      ethnicity,
      level,
      name,
      personality,
      profession,
      statsVisible: false,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.mercenaries.add(mercenary);
  };

  private generateQuest = async (levelRange: T_TwoItemNumberArray) => {
    const type = pickArray(QUEST_TYPE, this.numberGenerator);
    const level = parseFloat((this.numberGenerator() * (levelRange[1] - levelRange[0]) + levelRange[0]).toFixed(2));

    const ethnicity = pickArray(worldGeneration.quests.ethnicities, this.numberGenerator);
    const name = generate.name();

    const profession = pickArray(worldGeneration.quests.professions, this.numberGenerator);

    const quest: Omit<T_Quest, 'questId'> = {
      level,
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
