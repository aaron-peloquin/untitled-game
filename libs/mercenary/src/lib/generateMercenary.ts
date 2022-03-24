import {pickArray, pickObject, pickRange} from '@helper';

interface I_Mercenary {
  name: string
  profession: string
  damage: number[]
  cost: number
  level: number
  health: number
  ethnicity: string
}

const MERC_CLASS: Record<string, string[]> = {
  Dwarf: ['Fighter', 'Barbarian'],
  Elf: ['Ranger', 'Druid'],
  Human: ['Fighter', 'Cleric', 'Ranger', 'Thief', 'Wizard'],
};

type T_BaseStats = {
  cost: number
  damage: number
  damageMultiplier: number
  endurance: number
  enduranceMultiplier: number
  stealth: number
  capture: number
}
const MERC_CLASS_BASE_STATS: Record<string, T_BaseStats> = {
  Barbarian: {capture: 30, cost: 6, damage: 11, damageMultiplier: 1, endurance: 6, enduranceMultiplier: 1.5, stealth: 30},
  Cleric: {capture: 30, cost: 5, damage: 5, damageMultiplier: 1, endurance: 15, enduranceMultiplier: 1.5, stealth: 30},
  Druid: {capture: 30, cost: 5, damage: 5, damageMultiplier: 1, endurance: 15, enduranceMultiplier: 1.5, stealth: 30},
  Fighter: {capture: 30, cost: 15, damage: 10, damageMultiplier: 1, endurance: 10, enduranceMultiplier: 1.5, stealth: 30},
  Ranger: {capture: 30, cost: 12, damage: 15, damageMultiplier: 1, endurance: 8, enduranceMultiplier: 1.5, stealth: 30},
  Thief: {capture: 30, cost: 5, damage: 20, damageMultiplier: 1, endurance: 5, enduranceMultiplier: 1.5, stealth: 30},
  Wizard: {capture: 30, cost: 5, damage: 5, damageMultiplier: 1, endurance: 10, enduranceMultiplier: 1, stealth: 30},
};
console.log(MERC_CLASS_BASE_STATS);

const MERC_NAMES: Record<string, string[]> = {
  Dwarf: ['Malka', 'Duru', 'Bobbet', 'Rangur'],
  Elf: ['Sundrey', 'Lillywind', 'Vello'],
  Human: ['Cora', 'Balic', 'Stephon', 'Jakub', 'Evelyn', 'Luigi', 'Lysa', 'Suphan'],
};


export const generateMercenary = (numberGenerator: () => number = Math.random) => (levelMin=1, levelMax=3):I_Mercenary => {
  const rangeGenerator = pickRange(numberGenerator);

  const level = rangeGenerator(levelMin, levelMax);
  const [ethnicity, mercClasses] = pickObject(MERC_CLASS, numberGenerator);
  const name = pickArray(MERC_NAMES[ethnicity], numberGenerator);
  const profession = pickArray(mercClasses, numberGenerator);

  const baseStats = MERC_CLASS_BASE_STATS[profession];
  const dmgLow = baseStats.damage ^ level;
  const dmgHigh = dmgLow * baseStats.damageMultiplier;
  const daWizard = [
    rangeGenerator(dmgLow, dmgHigh),
    rangeGenerator(dmgLow, dmgHigh),
  ].sort();

  const endLow = baseStats.endurance ^ level;
  const endHigh = endLow * baseStats.enduranceMultiplier;
  const health = rangeGenerator(endLow, endHigh);

  const cost = health + (daWizard[0]+daWizard[1]);

  return {
    cost,
    damage: daWizard,
    ethnicity,
    health,
    level,
    name,
    profession,
  };
};
