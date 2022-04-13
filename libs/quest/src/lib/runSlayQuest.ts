/* eslint-disable guard-for-in */
import {pickArray, pickRange, seedGenerator} from '@helper';
import * as _ from 'lodash';
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
    const damage = (numberRange(0, 10) + mercenaryStats.attack) / questStats.endurance;
    questCurrentHealth -= damage;
    const roundDescription = `attacked ${quest.targetName} for ${Math.round(damage)}`;
    roundsLog.push({action: roundDescription, person: quest.targetName});
  };

  const questAttack = () => {
    const damage = (numberRange(0, 10) + questStats.attack) / mercenaryStats.endurance;
    mercenaryCurrentHealth -= damage;
  };

  mercenaryAttack();

  while (questCurrentHealth > 0 && mercenaryCurrentHealth > 0) {
    questAttack();
    mercenaryAttack();
  }

  if (mercenaryCurrentHealth > 0) {
    outcome = 'Victory';
    roundsLog.push({action: `defeated ${quest.targetName}`, person: mercenary.name});
  } else if (mercenaryCurrentHealth <= -(mercenary.level * 2)) {
    outcome = 'Death';
    roundsLog.push({action: 'never returned', person: mercenary.name});
  } else {
    outcome = 'Failure';
    roundsLog.push({action: `returned in failure`, person: mercenary.name});
  }

  const result: T_QuestResult = {
    mercenaryCurrentHealth,
    outcome,
    removeMercenary: false,
    rewards: {bandExp: 5, gold: 2, mercenaryExp: 5},
    roundsLog,
  };

  return result;
};

