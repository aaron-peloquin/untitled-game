import Dexie, {Table} from 'dexie';
import {T_Band} from 'TS_Band';
import {T_Location} from 'TS_Location';
import {T_Mercenary} from 'TS_Mercenary';
import {T_Quest} from 'TS_Quest';

// export gameData datastore, to be initalized by the provider
export class GameDataClass extends Dexie {
  band!: Table<T_Band, number>;
  locations!: Table<T_Location, number>;
  mercenaries!: Table<T_Mercenary, number>;
  quests!: Table<T_Quest, number>;

  constructor(gameDatastoreName: string) {
    super(`untitled-game-${gameDatastoreName}`);
    this.version(1).stores({
      // Primary key and indexed props
      band: '++bandId, name, currentSave',
      locations: '++locationId, *mercenaries, *quests, *relatedLocations',
      mercenaries: '++mercenaryId, ethnicity, personality, profession, statsVisible',
      quests: '++questId, targetEthnicity, targetProfession, type',
    });
  }
}
