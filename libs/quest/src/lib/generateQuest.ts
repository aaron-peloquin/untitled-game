import _ from 'lodash';

interface I_Quest {
  title: string
  type: string
}

const pickRandom = (arr: string[]):string => {
  return arr[Math.floor(Math.random()*arr.length)];
};

const QUEST_TYPES = [
  'Slay',
  'Capture',
];

const QUEST_DESCRIPTORS = {
  'Slay': ['Kill', 'Eliminate', 'Destroy'],
  'Capture': ['Capture', 'Retrieve'],
};

const QUEST_TARGET_TITLES = [
  'Sir',
  'Bandit',
  'Knave',
  'Thief',
  'Rogue',
  'Troublemaker',
];

const QUEST_TARGET_NAMES = [
  'Liam', 'Olivia', 'Noah', 'Emma',
  'Oliver', 'Ava', 'Elijah', 'Charlotte',
  'William', 'Sophia', 'James', 'Amelia',
  'Benjamin', 'Isabella', 'Lucas', 'Mia',
  'Henry', 'Evelyn', 'Alexander', 'Harper',
];

export const generateQuest = ():I_Quest => {
  const type = pickRandom(QUEST_TYPES);
  const typeDescriptor = pickRandom(_.get(QUEST_DESCRIPTORS, type));
  const targetTitle= pickRandom(QUEST_TARGET_TITLES);
  const targetName = pickRandom(QUEST_TARGET_NAMES);
  const title = `${typeDescriptor} ${targetTitle} ${targetName}`;
  return {
    title,
    type,
  };
};
