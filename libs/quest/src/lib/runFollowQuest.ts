import {pickArray, pickRange, seedGenerator} from '@helper';
import {GiAcrobatic, GiArmSling, GiFootsteps, GiHumanEar, GiPointing, GiStandingPotion} from 'react-icons/gi';
import {T_TwoItemStringArray, T_TwoItemStringNodeArray} from 'TS_General';
import {T_QuestLogItem, T_QuestOutcome, T_QuestResults, T_RunQuestSig} from 'TS_Quest';

const questWrappingActions: T_TwoItemStringArray[] = [
  ['departs from a local tavern', 'stumbles into a brothal'],
  ['departs from a local tavern', 'stumbles through the doorway of their home'],
  ['departs from a local tavern', 'arrives at someone else\'s home'],
  ['takes off from work', 'arrives home'],
  ['takes off from work', 'enters an unmarked business'],
  ['takes off from work', 'enters an unmarked business'],
  ['leaves their home', 'arrives at their place of work'],
  ['leaves their home', 'quickly sneaks into a brothel'],
  ['leaves their home', 'enters a shady business'],
  ['leaves their home', 'meets up with some friends'],
];

const stealthActions: ((questName: string) => string)[] = [
  (questName: string) => `sneaks along behind ${questName}`,
  (questName: string) => `tracks ${questName} along a riverbank`,
  (questName: string) => `follows a little too close to ${questName}`,
  (questName: string) => `follows ${questName} through a forest path`,
  (questName: string) => `quickly runs after ${questName}, dashing between trees`,
  (questName: string) => `takes a shortcut to keep ${questName} in sight`,
  () => `tries to act casual as they need to walk in the open`,
  () => `moves between shadows`,
  () => `dashes between hiding spots`,
  () => `hides amoung some empty crates`,
  () => `slowly creeps `,
  () => `tries to blend in with townsfolk`,
];

const questReactions: T_TwoItemStringNodeArray[] = [
  ['thinks they heard something!', GiHumanEar],
  ['turns around quickly!', GiAcrobatic],
  ['feels like they are being followed and stops to look around at strangers', GiStandingPotion],
];

const fadeInAnimation = {animation: 'fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const mercenarySneakAnimation = {animation: 'sneak-from-left 3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const mercenarySneakAnimationWithPause = {animation: 'sneak-from-left-pause 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const mercenarySneakAnimationWithCaught = {animation: 'sneak-from-left-caught 2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const questReactionAnimation = {animation: 'fly-from-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'};
const animationDelayIncriment = 0.5;
const animationDelayIncrimentMercenary = 3.5;
const animationDelayIncrimentQuest = 0.2;

export const runFollowQuest:T_RunQuestSig = ({quest, mercenary, mercenaryStats, questStats}) => {
  let outcome: T_QuestOutcome = 'Victory';
  const numberGenerator = seedGenerator(`${quest.type} ${quest.targetName} ${quest.targetProfession}`);
  const numberRange = pickRange(numberGenerator);
  const roundsLog: T_QuestLogItem[] = [];
  let mercenaryCurrentHealth = mercenary.currentHealth;

  const checksNeeded = Math.ceil(quest.level * 2);
  let checksPassed = 0;
  let mercenaryDetectedResult = 0;
  let suspiciousTarget = 0;

  const wrappingActions = pickArray(questWrappingActions, numberGenerator);
  roundsLog.push({
    action: wrappingActions[0],
    person: quest.targetName,
  });

  let animationDelayCounter = 1;

  const questDifficultyCheck = ((questStats.cunning + questStats.subtlety) * 2) + quest.level - Math.sqrt(mercenaryStats.endurance);
  const mercenaryStealthing = () => {
    const sneakAction = pickArray(stealthActions, numberGenerator)(quest.targetName);
    const stealthTopRange = ((mercenaryStats.cunning) * 2) + mercenary.level;
    const stealthAttempt = numberRange(0, stealthTopRange) + (mercenaryStats.subtlety * 2);

    const stealthResult = stealthAttempt - (questDifficultyCheck + (suspiciousTarget * 2));
    console.log({
      questDifficultyCheck,
      stealthAttempt,
      stealthResult,
      stealthTopRange,
      suspiciousTarget,
    });
    if (stealthResult >= 0) {
      checksPassed++;
      if (stealthResult < 5) {
        // suspicious description
        suspiciousTarget++;
        roundsLog.push({action: sneakAction, icon: GiFootsteps, person: mercenary.name, styles: {...mercenarySneakAnimationWithPause, animationDelay: `${animationDelayCounter}s`}});
        animationDelayCounter += animationDelayIncrimentQuest;
        const questReaction = pickArray(questReactions, numberGenerator);
        roundsLog.push({action: questReaction[0], icon: questReaction[1], person: quest.targetName, styles: {...questReactionAnimation, animationDelay: `${animationDelayCounter}s`}});
      } else {
        // successful stealth description
        roundsLog.push({action: sneakAction, icon: GiFootsteps, person: mercenary.name, styles: {...mercenarySneakAnimation, animationDelay: `${animationDelayCounter}s`}});
      }
      animationDelayCounter += animationDelayIncrimentMercenary;
    } else {
      // failed
      mercenaryDetectedResult = stealthResult;
      roundsLog.push({action: sneakAction, icon: GiFootsteps, person: mercenary.name, styles: {...mercenarySneakAnimationWithCaught, animationDelay: `${animationDelayCounter}s`}});
      animationDelayCounter += animationDelayIncrimentQuest;
      roundsLog.push({action: `caught ${mercenary.name}!`, icon: GiPointing, person: quest.targetName, styles: {...questReactionAnimation, animationDelay: `${animationDelayCounter}s`}});
    }
  };

  while (checksPassed < checksNeeded && mercenaryDetectedResult === 0) {
    mercenaryStealthing();
  }

  const removeMercenary = false;
  let removeQuest = false;
  let goldReward = 0;
  let mercExp = 0;
  const lastItemAnimationDelay = animationDelayCounter + (animationDelayIncriment * 1.5);
  const lastItemStylesObj = {...fadeInAnimation, animationDelay: `${lastItemAnimationDelay}s`};
  const finalStyles = {...fadeInAnimation, animationDelay: `${lastItemAnimationDelay + (animationDelayIncriment * 2)}s`};
  if (mercenaryDetectedResult === 0) {
    outcome = 'Success';
    removeQuest = true;
    mercExp = parseFloat((0.2 * quest.level / mercenary.level + (roundsLog.length / 300) / 3).toFixed(2));
    goldReward = Math.round((quest.level) + (questStats._goldUpkeep / 2));

    roundsLog.push({action: wrappingActions[1], person: quest.targetName, styles: lastItemStylesObj});
    roundsLog.push({action: `reports back to the contact, returning with ${goldReward} gold`, person: mercenary.name, styles: lastItemStylesObj});
  } else if (mercenaryDetectedResult > (4 * Math.sqrt(mercenary.level))) {
    outcome = 'Caught';
    mercenaryCurrentHealth = 0;
    mercExp = parseFloat((0.15 * quest.level / mercenary.level / 4).toFixed(2));

    roundsLog.push({action: ` limps back in great pain. ${quest.targetName} apparently has some friends in high places`, icon: GiArmSling, person: mercenary.name, styles: lastItemStylesObj});
  } else {
    outcome = 'Failure';
    mercExp = parseFloat((0.10 * quest.level / mercenary.level / 5).toFixed(2));

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

