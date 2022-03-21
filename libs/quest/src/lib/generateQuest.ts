import {pickArray, pickObject} from '@helper';

interface I_Quest {
  type: string
  level: number
  target: {
    name: string
    ethnicity: string
    profession: string
  }
}

const QUEST_TYPE = [
  'Slay',
  'Capture',
  'Follow',
];
const QUEST_TARGET_NAMES: Record<string, string[]> = {
  Human: [
    'Liam', 'Olivia', 'Noah', 'Emma',
    'Oliver', 'Ava', 'Elijah', 'Charlotte',
    'William', 'Sophia', 'James', 'Amelia',
    'Benjamin', 'Isabella', 'Lucas', 'Mia',
    'Henry', 'Evelyn', 'Alexander', 'Harper',
  ],
  Goblin: [
    'Krug', 'Nob', 'Ruz', 'Mul',
    'Geez', 'Gop', 'Stix', 'Ag',
  ],
};

const QUEST_TARGET_PROFESSIONS: Record<string, string[]> = {
  Human: [
    'Blacksmith', 'Brewer', 'Farmer', 'Fisher',
    'Noble', 'Bandit', 'Thief', 'Tavernkeeper',
  ],
  Goblin: [
    'Spearmaker', 'Scout', 'Thief', 'Bandit',
  ],
};

export const generateQuest = (levelMin=0.6, levelMax=1.75):I_Quest => {
  const level = (Math.random() * (levelMax - levelMin) + levelMin).toFixed(2);
  const type = pickArray(QUEST_TYPE);

  const [ethnicity, targetNames] = pickObject(QUEST_TARGET_NAMES);
  const name = pickArray(targetNames);
  const profession = pickArray(QUEST_TARGET_PROFESSIONS[ethnicity]);


  return {
    type,
    level: parseFloat(level),
    target: {
      ethnicity,
      name,
      profession,
    },
  };
};
