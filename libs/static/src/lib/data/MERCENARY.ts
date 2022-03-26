import {T_BaseStats} from 'TS_Mercenary';


export const MERC_CLASS: Record<string, string[]> = {
  Dwarf: ['Fighter', 'Barbarian'],
  Elf: ['Ranger', 'Druid'],
  Human: ['Fighter', 'Cleric', 'Ranger', 'Thief', 'Wizard'],
};

export const MERC_ETHNICITY_BASE_STATS: Record<string, T_BaseStats> = {
  Dwarf: {capture: 0, cost: 2, attack: 15, endurance: 2, stealth: -5},
  Elf: {capture: 15, cost: 2, attack: -5, endurance: 0, stealth: 15},
  Human: {capture: 10, cost: 0, attack: 10, endurance: 1, stealth: 10},
}

export const MERC_CLASS_BASE_STATS: Record<string, T_BaseStats> = {
  Barbarian: {capture: 15, cost: 2, attack: 75, endurance: 2, stealth: 5},
  Cleric: {capture: 80, cost: 2, attack: 20, endurance: 5, stealth: 15},
  Druid: {capture: 65, cost: 2, attack: 15, endurance: 4, stealth: 30},
  Fighter: {capture: 70, cost: 2, attack: 35, endurance: 8, stealth: 15},
  Ranger: {capture: 40, cost: 2, attack: 15, endurance: 5, stealth: 70},
  Thief: {capture: 25, cost: 2, attack: 20, endurance: 4, stealth: 85},
  Wizard: {capture: 35, cost: 2, attack: 85, endurance: 1, stealth: 10},
};

export const MERC_NAMES: Record<string, string[]> = {
  Dwarf: ['Malka', 'Duru', 'Bobbet', 'Rangur'],
  Elf: ['Sundrey', 'Lillywind', 'Vello'],
  Human: ['Cora', 'Balic', 'Stephon', 'Jakub', 'Evelyn', 'Luigi', 'Lysa', 'Suphan'],
};
