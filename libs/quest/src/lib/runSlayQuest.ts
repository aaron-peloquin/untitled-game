/* eslint-disable guard-for-in */
import {pickRange, seedGenerator} from '@helper';
import * as _ from 'lodash';

import {T_Mercenary} from 'TS_Mercenary';
import {I_BaseQuest, T_FullRunQuestSig, I_QuestResult} from 'TS_Quest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const analytics: Record<string, any> = {};

const increaseAnalytics = (mercenary: T_Mercenary, quest: I_BaseQuest, result:I_QuestResult) => {
  const mercLevel = Math.round(mercenary.level);
  const questLevel = Math.round(quest.level);
  const analyticsPath = `${mercenary.profession}.${mercLevel}.${questLevel}`;
  const metricValue = _.get(analytics, `${analyticsPath}.outcomes.${result.outcome}`, 0);
  _.set(analytics, `${analyticsPath}.outcomes.${result.outcome}`, metricValue + 1);

  const analyticsRounds = _.get(analytics, `${analyticsPath}.rounds`, []);
  analyticsRounds.push(result.roundsLog.length - 2);
  _.set(analytics, `${analyticsPath}.rounds`, analyticsRounds);
  _.set(analytics, `${analyticsPath}.outcomes.totalRuns`, analyticsRounds.length);
  _.set(analytics, `${analyticsPath}.outcomes.AverageRounds`, _.mean(analyticsRounds));
};

export const logAnalytics = () => {
  const tabularData = {};
  console.clear();
  console.log('full analytics:', analytics);
  for (const profession in analytics) {
    const mercLevels = analytics[profession];
    for (const mercLevel in mercLevels) {
      const questLevels = mercLevels[mercLevel];
      for (const questLevel in questLevels) {
        const outcomes = questLevels[questLevel].outcomes;
        const parsedData = {
          ...outcomes,
          AverageRounds: parseFloat(outcomes.AverageRounds.toFixed(3)),
          mercLevel: parseInt(mercLevel),
          profession,
          questLevel: parseInt(questLevel),
        };
        _.set(tabularData, `M${mercLevel}_Q${questLevel}_${profession}`, parsedData);
      }
    }
  }
  console.table(tabularData);
  return tabularData;
};

export const runSlayQuest:T_FullRunQuestSig = (quest) => (mercenary) => {
  const numberGenerator = seedGenerator(`${quest.type} ${quest.target.name} ${quest.target.profession}`);
  const numberRange = pickRange(numberGenerator);
  const roundsLog = [];
  let outcome = '';

  const questMaxHealth = quest.level + numberRange(0, quest.level * 2);
  let questCurrentHealth = questMaxHealth;
  let mercCurrentHealth = mercenary.health;
  const difficulty = (quest.level + 0.25) - mercenary.level;
  const percentDifficulty = difficulty * 25;
  roundsLog.push(`${mercenary.name} (${mercCurrentHealth.toFixed(2)} hp) engages in combat with ${quest.target.name} (${questCurrentHealth.toFixed(2)} hp). ${difficulty}:${percentDifficulty}`);

  while (questCurrentHealth > 0 && mercCurrentHealth > 0) {
    const questHit = (numberRange(1, 100) + percentDifficulty);
    const mercenaryHit = (numberRange(1, 100) - percentDifficulty + mercenary.stats.attack);

    if (questHit >= 50) {
      mercCurrentHealth -= numberRange(.25, .75) * quest.level;
    }
    if (mercenaryHit >= 50) {
      questCurrentHealth -= numberRange(.25, .75) * mercenary.level;
    }

    const roundDescription = `${mercenary.name} (${mercCurrentHealth.toFixed(2)} hp) ${mercenaryHit ? `hit (${mercenaryHit}%)` : `missed (${mercenaryHit}%)`} ${quest.target.name}
    (${questCurrentHealth.toFixed(2)} hp), and they ${questHit ? `hit (${questHit}%)` : `missed (${questHit}%)`}`;
    roundsLog.push(roundDescription);
  }
  if (mercCurrentHealth > 0) {
    outcome = 'Success';
    roundsLog.push(`${mercenary.name} successfully defeated ${quest.target.name}`);
  } else if (mercCurrentHealth <= -(mercenary.level / 2)) {
    outcome = 'Death';
    roundsLog.push(`${mercenary.name} died`);
  } else {
    outcome = 'Failure';
    roundsLog.push(`${mercenary.name} was returned in failure`);
  }

  const result: I_QuestResult = {
    outcome,
    rewards: {exp: 5, gold: 2},
    roundsLog,
  };

  increaseAnalytics(mercenary, quest, result);

  return result;
};

