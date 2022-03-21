import {pickArray, pickObject, pickRange} from '@helper';

interface I_Mercenary {
  name: string
  profession: string
  damage: [number, number]
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


export const generateMercenary = (levelMin=0.6, levelMax=1.75):I_Mercenary => {
  const level = pickRange(levelMin, levelMax);
  const damage = [
    pickRange(levelMin, levelMax, 2),
    pickRange(levelMin, levelMax, 2),
  ];

  const health = pickRange(level, level * 2, (level*5)+5, 0);

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

