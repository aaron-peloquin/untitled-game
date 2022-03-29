// db.ts
import Dexie, {Table} from 'dexie';
import {T_GameSave} from 'TS_General';
import {T_Location} from 'TS_Location';
import {T_Mercenary} from 'TS_Mercenary';
import {I_BaseQuest} from 'TS_Quest';

export class MySubClassedDexie extends Dexie {
  gameSaves!: Table<T_GameSave>;
  locations!: Table<T_Location>;
  mercenaries!: Table<T_Mercenary>;
  quests!: Table<I_BaseQuest>;

  constructor() {
    super('untitled-game');
    this.version(1).stores({
      // Primary key and indexed props
      gameSaves: '++id, name, currentSave',
      locations: '++id, gameSaveId, name',
      mercenaries: '++id, gameSaveId, name, profession, ethnicity',
      quests: '++id, gameSaveId, type, level',
    });
  }
}

export const db = new MySubClassedDexie();
