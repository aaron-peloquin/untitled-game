import {pickRange, seedGenerator} from '@helper';
import {T_FullRunQuestSig} from 'TS_Quest';

export const runSlayQuest:T_FullRunQuestSig = (quest) => (mercenary) => {
  const numberGenerator = seedGenerator(`${quest.target.name}_${quest.target.profession}`);
  const numberRange = pickRange(numberGenerator);
  const roundsLog = [];
  let outcome = '';

  const questMaxHealth = (quest.level * numberGenerator()) ^ 30;
  let questCurrentHealth = questMaxHealth;
  let mercCurrentHealth = mercenary.health;
  console.log('running slay quest:', {mercCurrentHealth, mercenary, quest, questMaxHealth});

  while (questCurrentHealth > 0 && mercCurrentHealth > 0) {
    const questChallengeDamage = (numberGenerator() * ((quest.level) ^ 2)) ^ (quest.level + 2);
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

