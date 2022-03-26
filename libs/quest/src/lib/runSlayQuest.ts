import {pickRange, seedGenerator} from '@helper';
import {T_FullRunQuestSig} from 'TS_Quest';

const analytics = {
  win: 0,
  lose: 0,
  dead: 0,
}

export const runSlayQuest:T_FullRunQuestSig = (quest) => (mercenary) => {
  const numberGenerator = seedGenerator(`${quest.target.name}_${quest.target.profession}`);
  const numberRange = pickRange(numberGenerator);
  const roundsLog = [];
  let outcome = '';

  const questMaxHealth = quest.level + numberRange(0, quest.level*2)
  let questCurrentHealth = questMaxHealth;
  let mercCurrentHealth = mercenary.health;
  const difficulty = (quest.level - mercenary.level) + .20
  const hitDifficulty = difficulty * 25;
  roundsLog.push(`${mercenary.name} (${mercCurrentHealth.toFixed(2)} hp) engages in combat with ${quest.target.name} (${questCurrentHealth.toFixed(2)} hp)`);
  let round = 0

  while (questCurrentHealth > 0 && mercCurrentHealth > 0) {
    round++
    const questHit = (numberRange(1, 100) + hitDifficulty)
    const mercenaryHit = (numberRange(1, 100) - hitDifficulty)
    
    if (questHit  >= 50) {
      mercCurrentHealth -= numberRange(.25, .75) * quest.level;
    }
    if (mercenaryHit >= 50) {
      questCurrentHealth -= numberRange(.25, .75) * mercenary.level;
    }

    const roundDescription = `${difficulty}:${hitDifficulty}: ${mercenary.name} (${mercCurrentHealth.toFixed(2)} hp) ${mercenaryHit ? `hit (${mercenaryHit}%)` : `missed (${mercenaryHit}%)`} ${quest.target.name}
    (${questCurrentHealth.toFixed(2)} hp), and they ${questHit ? `hit (${questHit}%)` : `missed (${questHit}%)`}`;
    roundsLog.push(roundDescription);
  }
  if (mercCurrentHealth > 0) {
    outcome = 'Success';
    analytics.win++
    roundsLog.push(`${mercenary.name} successfully defeated ${quest.target.name}`)
  } else if (mercCurrentHealth <= -(mercenary.level/2)) {
    outcome = 'Death';
    analytics.dead++
    roundsLog.push(`${mercenary.name} died`)
  } else {
    analytics.lose++
    outcome = 'Failure';
    roundsLog.push(`${mercenary.name} was returned in failure`)
  }
  console.log('analytics', analytics)

  return {
    outcome,
    rewards: {
      exp: 5,
      gold: 2,
    },
    roundsLog,
  };
};

