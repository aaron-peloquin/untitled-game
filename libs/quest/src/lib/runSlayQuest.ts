import {pickArray, pickRange, seedGenerator} from '@helper';
import {T_QuestLogItem, T_QuestOutcome, T_QuestResult, T_RunQuestSig} from 'TS_Quest';

const initialActions = [
  (name: string) => `Tracks down ${name} in a nearby village`,
  (name: string) => `Follows ${name} out of town`,
  (name: string) => `Sets an ambush for ${name} along the road`,
];

export const runSlayQuest:T_RunQuestSig = ({quest, mercenary, mercenaryStats, questStats}) => {
  const numberGenerator = seedGenerator(`${quest.type} ${quest.targetName} ${quest.targetProfession}`);
  const numberRange = pickRange(numberGenerator);
  const roundsLog: T_QuestLogItem[] = [];
  let outcome: T_QuestOutcome = 'Victory';

  let questCurrentHealth = questStats.maxHealth;
  let mercenaryCurrentHealth = mercenary.currentHealth;
  roundsLog.push({
    action: pickArray(initialActions, numberGenerator)(quest.targetName),
    person: mercenary.name,
  });

  const mercenaryAttack = () => {
    const damage = (numberRange(1, 20) + mercenaryStats.attack) / (questStats.endurance / 4);
    questCurrentHealth -= damage;
    const roundDescription = `attacked ${quest.targetName} for ${Math.round(damage)} damage`;
    roundsLog.push({action: roundDescription, person: mercenary.name});
  };

  const questAttack = () => {
    const topRange = quest.level > 20 ? 20 : quest.level;
    const damage = (numberRange(0, topRange) + questStats.attack) / (mercenaryStats.endurance / 4);
    mercenaryCurrentHealth -= damage;
    const roundDescription = `attacked ${quest.targetName} for ${Math.round(damage)} damage`;
    roundsLog.push({action: roundDescription, person: quest.targetName});
  };

  mercenaryAttack();

  while (questCurrentHealth > 0 && mercenaryCurrentHealth > 0) {
    questAttack();
    mercenaryAttack();
  }

  let removeMercenary = false;
  let removeQuest = false;

  if (mercenaryCurrentHealth > 0) {
    outcome = 'Victory';
    removeQuest = true;
    roundsLog.push({action: `defeated ${quest.targetName}`, person: mercenary.name});
  } else if (mercenaryCurrentHealth <= -(mercenary.level * 2)) {
    outcome = 'Death';
    removeMercenary = true;
    roundsLog.push({action: 'never returned', person: mercenary.name});
  } else {
    outcome = 'Failure';
    roundsLog.push({action: `returned in failure`, person: mercenary.name});
  }

  const mercExp = 0.05 * quest.level;

  const result: T_QuestResult = {
    band: {exp: mercExp / mercenary.level, gold: 2},
    mercenary: {exp: mercExp, health: mercenaryCurrentHealth, remove: removeMercenary},
    outcome,
    quest: {remove: removeQuest},
    roundsLog,
  };

  return result;
};

