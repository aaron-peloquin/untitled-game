import {seedGenerator, pickArray, pickObject} from '@helper';

const questSeed = seedGenerator('quest?');
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
  Goblin: [
    'Krug', 'Nob', 'Ruz', 'Mul',
    'Geez', 'Gop', 'Stix', 'Ag',
  ],
  Human: [
    'Liam', 'Olivia', 'Noah', 'Emma',
    'Oliver', 'Ava', 'Elijah', 'Charlotte',
    'William', 'Sophia', 'James', 'Amelia',
    'Benjamin', 'Isabella', 'Lucas', 'Mia',
    'Henry', 'Evelyn', 'Alexander', 'Harper',
  ],
};

const QUEST_TARGET_PROFESSIONS: Record<string, string[]> = {
  Goblin: [
    'Spearmaker', 'Scout', 'Thief', 'Bandit',
  ],
  Human: [
    'Blacksmith', 'Brewer', 'Farmer', 'Fisher',
    'Noble', 'Bandit', 'Thief', 'Tavernkeeper',
  ],
};

export const generateQuest = (numberGenerator: () => number = Math.random) => (levelMin=0.6, levelMax=1.75):I_Quest => {
  const level = (Math.random() * (levelMax - levelMin) + levelMin).toFixed(2);
  const type = pickArray(QUEST_TYPE, numberGenerator);

  const [ethnicity, targetNames] = pickObject(QUEST_TARGET_NAMES, numberGenerator);
  const name = pickArray(targetNames, numberGenerator);
  const profession = pickArray(QUEST_TARGET_PROFESSIONS[ethnicity], numberGenerator);


  return {
    level: parseFloat(level),
    target: {
      ethnicity,
      name,
      profession,
    },
    type,
  };
};
