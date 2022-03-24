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

const MERC_CLASS_BASE_STATS = {
  Barbarian: {cost: 6, damage: 11, health: 6},
  Cleric: {cost: 5, damage: 5, health: 15},
  Druid: {cost: 5, damage: 5, health: 15},
  Fighter: {cost: 15, damage: 10, health: 10},
  Ranger: {cost: 12, damage: 15, health: 8},
  Thief: {cost: 5, damage: 20, health: 5},
  Wizard: {cost: 5, damage: 5, health: 15},
};

const MERC_NAMES: Record<string, string[]> = {
  Dwarf: ['Malka', 'Duru', 'Bobbet', 'Rangur'],
  Elf: ['Sundrey', 'Lillywind', 'Vello'],
  Human: ['Balic', 'Stephon', 'Jakub', 'Evelyn', 'Luigi', 'Lysa', 'Suphan'],
};


export const generateMercenary = (numberGenerator: () => number = Math.random) => (levelMin=1, levelMax=3):I_Mercenary => {
  const rangeGenerator = pickRange(numberGenerator);

  const level = rangeGenerator(levelMin, levelMax);
  const [ethnicity, mercClasses] = pickObject(MERC_CLASS, numberGenerator);
  const profession = pickArray(mercClasses, numberGenerator);
  const name = pickArray(MERC_NAMES[ethnicity], numberGenerator);

  return {
    cost: 4,
    damage: [1, 2],
    ethnicity,
    health: 3,
    level,
    name,
    profession,
  };

  // const damage = [
  //   rangeGenerator(levelMin, levelMax, 2),
  //   rangeGenerator(levelMin, levelMax, 2),
  // ].sort();

  // const hpMultiplier = ((level > levelAverage ? level:levelAverage) * 5) + 5;
  // const health = rangeGenerator(level, level * 1.5, hpMultiplier, 0);


  // const cost = level + damage[0] + damage[1] + health;
};
