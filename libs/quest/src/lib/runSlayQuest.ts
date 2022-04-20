import {pickArray, pickRange, seedGenerator} from '@helper';
import {T_QuestLogItem, T_QuestOutcome, T_QuestResult, T_RunQuestSig} from 'TS_Quest';

const initialActions = [
  (name: string) => `Tracks down ${name} in a nearby village`,
  (name: string) => `Follows ${name} out of town`,
  (name: string) => `Sets an ambush for ${name} along the road`,
];

const fadeInAnimation = {animation: 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const animationDelayIncriment = 0.75;

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

  let animationDelayCounter = 0;

  const mercenaryAttack = () => {
    animationDelayCounter += animationDelayIncriment;
    const hit = numberRange(0, (mercenaryStats.subtlety * 10) + mercenary.level);
    if (hit > questStats.cunning) {
      const damage = (numberRange(1, 20) + mercenaryStats.attack) / (questStats.endurance / 5);
      questCurrentHealth -= damage;
      const roundDescription = `attacked ${quest.targetName} for ${Math.round(damage)} damage`;
      roundsLog.push({action: roundDescription, person: mercenary.name, styles: {...fadeInAnimation, animationDelay: `${animationDelayCounter}s`}});
    } else {
      roundsLog.push({action: `dodged ${mercenary.name}'s attack`, person: quest.targetName, styles: {...fadeInAnimation, animationDelay: `${animationDelayCounter}s`}});
    }
  };

  const questAttackTopRange = quest.level > 20 ? 20 : quest.level;
  const questAttack = () => {
    animationDelayCounter += animationDelayIncriment;
    const hit = numberRange(0, questStats.subtlety * 10);
    if (hit > mercenaryStats.cunning) {
      const damage = (numberRange(0, questAttackTopRange) + questStats.attack) / (mercenaryStats.endurance / 5);
      mercenaryCurrentHealth -= damage;
      roundsLog.push({action: `attacked ${mercenary.name} for ${Math.round(damage)} damage`, person: quest.targetName, styles: {...fadeInAnimation, animationDelay: `${animationDelayCounter}s`}});
    } else {
      roundsLog.push({action: `dodged ${quest.targetName}'s attack`, person: mercenary.name, styles: {...fadeInAnimation, animationDelay: `${animationDelayCounter}s`}});
    }
  };

  mercenaryAttack();

  while (questCurrentHealth > 0 && mercenaryCurrentHealth > 0 && roundsLog.length < 30) {
    questAttack();
    mercenaryAttack();
  }


  let removeMercenary = false;
  let removeQuest = false;
  let goldReward = 0;
  let mercExp = 0;
  const finalAnimationDelay = animationDelayCounter + (animationDelayIncriment * 2);
  const finalStylesObj = {...fadeInAnimation, animationDelay: `${finalAnimationDelay}s`};
  if (roundsLog.length >= 30) {
    outcome = 'Failure';
    mercExp = parseFloat((0.05 * quest.level / mercenary.level).toFixed(2)) / 2;
    goldReward = Math.round(quest.level);
    roundsLog.push({action: `escaped, dropping ${goldReward} gold as they fled`, person: quest.targetName, styles: finalStylesObj});
  } else if (mercenaryCurrentHealth > 0) {
    outcome = 'Victory';
    removeQuest = true;
    mercExp = parseFloat((0.15 * quest.level / mercenary.level).toFixed(2));
    goldReward = Math.round((quest.level) + (questStats._goldUpkeep / 4));

    roundsLog.push({action: `defeated ${quest.targetName} and returned with ${goldReward} gold`, person: mercenary.name, styles: finalStylesObj});
  } else if (mercenaryCurrentHealth <= -(mercenary.level * 2)) {
    outcome = 'Death';
    removeMercenary = true;

    roundsLog.push({action: 'never returned', person: mercenary.name, styles: finalStylesObj});
  } else {
    outcome = 'Failure';
    mercExp = parseFloat((0.10 * quest.level / mercenary.level).toFixed(2)) / 2;

    roundsLog.push({action: `returned in failure`, person: mercenary.name, styles: finalStylesObj});
  }

  const bandExp = parseFloat((mercExp / mercenary.level).toFixed(2));

  const result: T_QuestResult = {
    band: {exp: bandExp, gold: goldReward},
    mercenary: {exp: mercExp, health: mercenaryCurrentHealth, remove: removeMercenary},
    outcome,
    quest: {remove: removeQuest},
    roundsLog,
  };

  return result;
};

