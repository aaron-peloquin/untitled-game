import {pickArray, pickRange, seedGenerator} from '@helper';
import {GiAcrobatic, GiBroadsword} from 'react-icons/gi';
import {T_QuestLogItem, T_QuestOutcome, T_QuestResults, T_RunQuestSig} from 'TS_Quest';

const initialActions = [
  (name: string) => `Tracks down ${name} in a nearby village`,
  (name: string) => `Follows ${name} out of town to a secluded spot`,
  (name: string) => `Sets an ambush for ${name} along the road`,
];

const fadeInAnimation = {animation: 'fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const flyInLeftAnimation = {animation: 'fly-from-left 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const flyInRightAnimation = {animation: 'fly-from-right 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const animationDelayIncriment = 0.5;

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
      const roundDescription = `attacked for ${Math.round(damage)} damage`;
      roundsLog.push({action: roundDescription, icon: GiBroadsword, person: mercenary.name, styles: {...flyInLeftAnimation, animationDelay: `${animationDelayCounter}s`}});
    } else {
      roundsLog.push({action: `dodged!`, icon: GiAcrobatic, person: quest.targetName, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
    }
  };

  const questAttackTopRange = quest.level > 20 ? 20 : quest.level;
  const questAttack = () => {
    animationDelayCounter += animationDelayIncriment;
    const hit = numberRange(0, questStats.subtlety * 10);
    if (hit > mercenaryStats.cunning) {
      const damage = (numberRange(0, questAttackTopRange) + questStats.attack) / (mercenaryStats.endurance / 5);
      mercenaryCurrentHealth -= damage;
      roundsLog.push({action: `attacked for ${Math.round(damage)} damage`, icon: GiBroadsword, person: quest.targetName, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
    } else {
      roundsLog.push({action: `dodges!`, icon: GiAcrobatic, person: mercenary.name, styles: {...flyInLeftAnimation, animationDelay: `${animationDelayCounter}s`}});
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
  const lastItemAnimationDelay = animationDelayCounter + (animationDelayIncriment * 1.5);
  const lastItemStylesObj = {...fadeInAnimation, animationDelay: `${lastItemAnimationDelay}s`};
  const finalStyles = {...fadeInAnimation, animationDelay: `${lastItemAnimationDelay + (animationDelayIncriment * 2)}s`};
  if (roundsLog.length >= 30) {
    outcome = 'Failure';
    mercExp = parseFloat((0.05 * quest.level / mercenary.level).toFixed(2)) / 2;
    goldReward = Math.round(quest.level);
    roundsLog.push({action: `escaped, dropping ${goldReward} gold as they fled`, person: quest.targetName, styles: lastItemStylesObj});
  } else if (mercenaryCurrentHealth > 0) {
    outcome = 'Victory';
    removeQuest = true;
    mercExp = parseFloat((0.15 * quest.level / mercenary.level).toFixed(2));
    goldReward = Math.round((quest.level) + (questStats._goldUpkeep / 4));

    roundsLog.push({action: `defeated ${quest.targetName} and returned with ${goldReward} gold`, person: mercenary.name, styles: lastItemStylesObj});
  } else if (mercenaryCurrentHealth <= -(mercenary.level * 2)) {
    outcome = 'Death';
    removeMercenary = true;

    roundsLog.push({action: 'never returned', person: mercenary.name, styles: lastItemStylesObj});
  } else {
    outcome = 'Failure';
    mercExp = parseFloat((0.10 * quest.level / mercenary.level).toFixed(2)) / 2;

    roundsLog.push({action: `returned in failure`, person: mercenary.name, styles: lastItemStylesObj});
  }

  const bandExp = parseFloat((mercExp / mercenary.level).toFixed(2));

  const result: T_QuestResults = {
    band: {exp: bandExp, gold: goldReward},
    finalStyles,
    mercenary: {exp: mercExp, health: mercenaryCurrentHealth, remove: removeMercenary},
    outcome,
    quest: {remove: removeQuest},
    roundsLog,
  };

  return result;
};

