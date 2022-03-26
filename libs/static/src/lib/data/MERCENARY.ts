import {T_BaseStats} from 'TS_Mercenary';


export const MERC_CLASS: Record<string, string[]> = {
  Dwarf: ['Fighter', 'Barbarian'],
  Elf: ['Ranger', 'Druid'],
  Human: ['Fighter', 'Cleric', 'Ranger', 'Thief', 'Wizard'],
};

export const MERC_ETHNICITY_BASE_STATS: Record<string, T_BaseStats> = {
  Dwarf: {attack: 15, capture: 0, cost: 2, endurance: 3, stealth: -10},
  Elf: {attack: -5, capture: 15, cost: 2, endurance: 1, stealth: 15},
  Human: {attack: 10, capture: 10, cost: 0, endurance: 1, stealth: 10},
};

export const MERC_CLASS_BASE_STATS: Record<string, T_BaseStats> = {
  Barbarian: {attack: 75, capture: 15, cost: 2, endurance: 2, stealth: 5},
  Cleric: {attack: 20, capture: 80, cost: 2, endurance: 5, stealth: 15},
  Druid: {attack: 15, capture: 65, cost: 2, endurance: 4, stealth: 30},
  Fighter: {attack: 35, capture: 70, cost: 2, endurance: 8, stealth: 15},
  Ranger: {attack: 15, capture: 40, cost: 2, endurance: 5, stealth: 70},
  Thief: {attack: 20, capture: 25, cost: 2, endurance: 4, stealth: 85},
  Wizard: {attack: 85, capture: 35, cost: 2, endurance: 1, stealth: 10},
};

export const MERC_NAMES: Record<string, string[]> = {
  Dwarf: ['Malka', 'Duru', 'Bobbet', 'Rangur'],
  Elf: ['Sundrey', 'Lillywind', 'Vello'],
  Human: ['Cora', 'Balic', 'Stephon', 'Jakub', 'Evelyn', 'Luigi', 'Lysa', 'Suphan'],
};
