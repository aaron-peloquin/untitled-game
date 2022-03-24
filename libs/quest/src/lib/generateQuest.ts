import {pickArray, pickObject, pickRange, seedGenerator} from '@helper';

type T_QuestResult = {
  outcome: string
  rewards: {
    exp: number
    gold: number
  }
  roundsLog: string[]
}
type T_RunQuestSig = (mercenary: any) => T_QuestResult
type T_FullRunQuestSig = (quest:I_BaseQuest) => T_RunQuestSig
interface I_BaseQuest {
  type: string
  level: number
  target: {
    name: string
    ethnicity: string
    profession: string
  }
}
interface I_Quest extends I_BaseQuest {
  run: T_RunQuestSig
}

const QUEST_TYPE = [
  'Slay',
  'Capture',
  'Follow',
];


const runSlayQuest:T_FullRunQuestSig = (quest) => (mercenary) => {
  const numberGenerator = seedGenerator(`${quest.target.name}_${quest.target.profession}`);
  const numberRange = pickRange(numberGenerator);
  const roundsLog = [];
  let outcome='';

  const questMaxHealth = (quest.level * numberGenerator()) ^ 30;
  let questCurrentHealth = questMaxHealth;
  let mercCurrentHealth = mercenary.health;
  console.log('running slay quest:', {mercCurrentHealth, mercenary, quest, questMaxHealth});

  while (questCurrentHealth > 0 && mercCurrentHealth > 0) {
    const questChallengeDamage = (numberGenerator() * ((quest.level/2) ^ 2)) ^ quest.level;
    const mercDamage = numberRange(mercenary.damage[0], mercenary.damage[1]);

    questCurrentHealth -= mercDamage;
    mercCurrentHealth -= questChallengeDamage;

    const roundDescription = `Attacked for ${mercDamage} (${questCurrentHealth}/${questMaxHealth}). ${mercenary.name} has  ${questChallengeDamage}/${mercCurrentHealth} health remaining`;
    roundsLog.push(roundDescription);
  }
  if (mercCurrentHealth > 0) {
    outcome = 'Success';
  } else if (mercCurrentHealth <= -(mercenary.health / 2)) {
    outcome = 'Death';
  } else {
    outcome = 'Failure';
  }

  return {
    outcome,
    rewards: {
      exp: 5,
      gold: 2,
    },
    roundsLog,
  };
};

const QUEST_CALLBACKS: Record<string, T_FullRunQuestSig> = {
  Capture: runSlayQuest,
  Follow: runSlayQuest,
  Slay: runSlayQuest,
};

const QUEST_TARGET_NAMES: Record<string, string[]> = {
  Goblin: [
    'Krug', 'Nobzzzzzzed', 'Ruz', 'Mul',
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
  const level = (numberGenerator() * (levelMax - levelMin) + levelMin).toFixed(2);
  const type = pickArray(QUEST_TYPE, numberGenerator);

  const [ethnicity, targetNames] = pickObject(QUEST_TARGET_NAMES, numberGenerator);
  const name = pickArray(targetNames, numberGenerator);
  const profession = pickArray(QUEST_TARGET_PROFESSIONS[ethnicity], numberGenerator);


  const quest: I_BaseQuest = {
    level: parseFloat(level),
    target: {
      ethnicity,
      name,
      profession,
    },
    type,
  };

  const questWithRunner: I_Quest = {
    ...quest,
    run: QUEST_CALLBACKS[type](quest),
  };
  return questWithRunner;
};
