import Dexie, {Table} from 'dexie';
import {T_GameSave} from 'TS_General';

export class GameControllerClass extends Dexie {
  gameSaves!: Table<T_GameSave, number>;

  constructor() {
    super('untitled-game-controller');
    this.version(1).stores({
      // Primary key and indexed props
      gameSaves: '++id, currentSave',
    });
  }
}

// globally initalize the gameController datastore
export const gameController = new GameControllerClass();
