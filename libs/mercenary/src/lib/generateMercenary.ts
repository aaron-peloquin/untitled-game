import {pickArray, pickObject, pickRange} from '@helper';

interface I_Mercenary {
  name: string
  profession: string
  damage: number[]
  level: number
  health: number
  ethnicity: string
}

const MERC_CLASS: Record<string, string[]> = {
  Human: ['Fighter', 'Cleric', 'Ranger', 'Thief'],
  Elf: ['Ranger', 'Druid'],
  Dwarf: ['Fighter', 'Barbarian'],
};

const MERC_NAMES: Record<string, string[]> = {
  Human: ['Balic', 'Stephon', 'Jakub', 'Evelyn', 'Luigi', 'Lysa', 'Suphan'],
  Elf: ['Sundrey', 'Lillywind', 'Vello'],
  Dwarf: ['Malka', 'Duru', 'Bobbet', 'Rangur'],
};


export const generateMercenary = (levelMin=1, levelMax=3):I_Mercenary => {
  const levelAverage = (levelMin + levelMax) / 2;
  const level = pickRange(levelMin, levelMax);
  const damage = [
    pickRange(levelMin, levelMax, 2),
    pickRange(levelMin, levelMax, 2),
  ].sort();

  const hpMultiplier = ((level > levelAverage ? level:levelAverage) * 5) + 5;
  const health = pickRange(level, level * 1.5, hpMultiplier, 0);

  const [ethnicity, mercClasses] = pickObject(MERC_CLASS);
  const profession = pickArray(mercClasses);
  const name = pickArray(MERC_NAMES[ethnicity]);

  const cost = level + damage[0] + damage[1] + health;

  return {
    name,
    ethnicity,
    damage,
    health,
    cost,
    profession,
    level,
  };
};

