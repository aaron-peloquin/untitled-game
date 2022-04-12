import Dexie, {Table} from 'dexie';
import _ = require('lodash');
import {T_GameSave, T_GameSetting} from 'TS_General';

const defaultSettings: Omit<T_GameSetting, 'hidden'>[] = [
  {label: 'Action points per day', name: 'ap_per_day', type: 'number', value: '5'},
  {label: 'Health per endurance point', name: 'hp_per_end', type: 'number', value: '5'},
];

class GameControllerClass extends Dexie {
  gameSaves!: Table<T_GameSave, number>;
  gameSettings!: Table<T_GameSetting, string>;

  constructor() {
    super('untitled-game-controller');
    this.version(1).stores({
      // Primary key and indexed props
      gameSaves: '++gameSaveId, currentSave',
      gameSettings: 'name, hidden',
    });

    this.on('ready', this.syncSettings);
  }

  syncSettings = async () => {
    // sync settings
    const allSettings = await this.gameSettings.toArray();
    const visibleSettings = allSettings.filter(({hidden}) => !hidden);

    const missingSettings = _.differenceBy(defaultSettings, allSettings, 'name')
        .map((setting) => ({...setting, hidden: 0}));

    const deprecateSettings = _.differenceBy(allSettings, defaultSettings, 'name')
        .filter(({hidden}) => !hidden)
        .map((setting) => ({...setting, hidden: 1}));

    const reactivateSettings = _.differenceBy(defaultSettings, visibleSettings, 'name')
        .map((setting) => ({...setting, hidden: 0}));

    this.gameSettings.bulkAdd(missingSettings);
    this.gameSettings.bulkPut(deprecateSettings);
    this.gameSettings.bulkPut(reactivateSettings);
  };
}

// globally initalize the gameController datastore
export const gameController = new GameControllerClass();
