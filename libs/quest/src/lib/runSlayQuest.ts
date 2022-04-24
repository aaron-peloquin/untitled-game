import {pickArray, pickRange, seedGenerator} from '@helper';
import {GiAcrobatic, GiBoots, GiBroadsword, GiDeathSkull, GiTripwire} from 'react-icons/gi';
import {T_QuestLogItem, T_QuestOutcome, T_QuestResults, T_RunQuestSig} from 'TS_Quest';

const initialActions = [
  (name: string) => `Tracks down ${name}`,
  (name: string) => `Spots ${name} while traveling`,
  (name: string) => `Finds ${name} hiding out in the woods`,
  (name: string) => `Tracks ${name} to a shady tavern`,
  (name: string) => `Locates ${name} after asking locals for their wherebaouts`,
  (name: string) => `Follows ${name} to a secluded spot`,
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
  let staggered = false;

  const mercenaryDamageChunk = (20 + mercenaryStats.attack) / (questStats.endurance / 5) / 5;
  const mercenaryAttack = () => {
    animationDelayCounter += animationDelayIncriment;
    if (!staggered) {
      const hit = numberRange(0, (mercenaryStats.subtlety * 10) + mercenary.level);
      if (hit > questStats.cunning) {
        const damage = (numberRange(1, 20) + mercenaryStats.attack) / (questStats.endurance / 5);
        questCurrentHealth -= damage;

        if (damage > (mercenaryDamageChunk * 2) && damage < (mercenaryDamageChunk * 3)) {
          staggered = true;
          roundsLog.push({action: `staggered ${quest.targetName}`, icon: GiTripwire, person: mercenary.name, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
        } else {
          let damageDescription = 'moderate';
          if (damage < (mercenaryDamageChunk * 2)) {
            damageDescription = 'light';
          } else if (damage > mercenaryDamageChunk * 4) {
            damageDescription = 'heavy';
          }
          const roundDescription = `attacked for ${damageDescription} damage`;
          roundsLog.push({action: roundDescription, icon: GiBroadsword, person: mercenary.name, styles: {...flyInLeftAnimation, animationDelay: `${animationDelayCounter}s`}});
        }
      } else {
        roundsLog.push({action: `dodged!`, icon: GiAcrobatic, person: quest.targetName, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
      }
    } else {
      roundsLog.push({action: `regains their footing`, icon: GiBoots, person: mercenary.name, styles: {...flyInLeftAnimation, animationDelay: `${animationDelayCounter}s`}});
      staggered = false;
    }
  };


  const questAttackTopRange = quest.level > 20 ? 20 : quest.level;
  const questDamageChunk = (questAttackTopRange + questStats.attack / (mercenaryStats.endurance / 5)) / 5;
  const questAttack = () => {
    animationDelayCounter += animationDelayIncriment;
    if (!staggered) {
      const hit = numberRange(0, questStats.subtlety * 10);
      if (hit > mercenaryStats.cunning) {
        const damage = (numberRange(0, questAttackTopRange) + questStats.attack) / (mercenaryStats.endurance / 5);
        mercenaryCurrentHealth -= damage;

        if (damage > (questDamageChunk * 2) && damage < (questDamageChunk * 3)) {
          staggered = true;
          roundsLog.push({action: `staggered ${mercenary.name}`, icon: GiTripwire, person: quest.targetName, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
        } else {
          let damageDescription = 'moderate';
          if (damage < (questDamageChunk * 2)) {
            damageDescription = 'light';
          } else if (damage > questDamageChunk * 4) {
            damageDescription = 'heavy';
          }
          roundsLog.push({action: `attacked for ${damageDescription} damage`, icon: GiBroadsword, person: quest.targetName, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
        }
      } else {
        roundsLog.push({action: `dodges!`, icon: GiAcrobatic, person: mercenary.name, styles: {...flyInLeftAnimation, animationDelay: `${animationDelayCounter}s`}});
      }
    } else {
      roundsLog.push({action: `regains their footing`, icon: GiBoots, person: quest.targetName, styles: {...flyInRightAnimation, animationDelay: `${animationDelayCounter}s`}});
      staggered = false;
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
    goldReward = Math.round((quest.level) + (questStats._goldUpkeep / 2));

    roundsLog.push({action: `defeated ${quest.targetName} and returned with ${goldReward} gold`, person: mercenary.name, styles: lastItemStylesObj});
  } else if (mercenaryCurrentHealth <= -(mercenary.level * 2)) {
    outcome = 'Death';
    removeMercenary = true;

    roundsLog.push({action: 'never returned', icon: GiDeathSkull, person: mercenary.name, styles: lastItemStylesObj});
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

