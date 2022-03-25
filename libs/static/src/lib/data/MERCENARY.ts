import {T_BaseStats} from 'TS_Mercenary';

export const MERC_CLASS: Record<string, string[]> = {
  Dwarf: ['Fighter', 'Barbarian'],
  Elf: ['Ranger', 'Druid'],
  Human: ['Fighter', 'Cleric', 'Ranger', 'Thief', 'Wizard'],
};

export const MERC_CLASS_BASE_STATS: Record<string, T_BaseStats> = {
  Barbarian: {capture: 30, cost: 6, damage: 11, damageMultiplier: 1, endurance: 6, enduranceMultiplier: 1.5, stealth: 30},
  Cleric: {capture: 30, cost: 5, damage: 5, damageMultiplier: 1, endurance: 15, enduranceMultiplier: 1.5, stealth: 30},
  Druid: {capture: 30, cost: 5, damage: 5, damageMultiplier: 1, endurance: 15, enduranceMultiplier: 1.5, stealth: 30},
  Fighter: {capture: 30, cost: 15, damage: 10, damageMultiplier: 1, endurance: 10, enduranceMultiplier: 1.5, stealth: 30},
  Ranger: {capture: 30, cost: 12, damage: 15, damageMultiplier: 1, endurance: 8, enduranceMultiplier: 1.5, stealth: 30},
  Thief: {capture: 30, cost: 5, damage: 20, damageMultiplier: 1, endurance: 5, enduranceMultiplier: 1.5, stealth: 30},
  Wizard: {capture: 30, cost: 5, damage: 5, damageMultiplier: 1, endurance: 10, enduranceMultiplier: 1, stealth: 30},
};
console.log(MERC_CLASS_BASE_STATS);

export const MERC_NAMES: Record<string, string[]> = {
  Dwarf: ['Malka', 'Duru', 'Bobbet', 'Rangur'],
  Elf: ['Sundrey', 'Lillywind', 'Vello'],
  Human: ['Cora', 'Balic', 'Stephon', 'Jakub', 'Evelyn', 'Luigi', 'Lysa', 'Suphan'],
};

