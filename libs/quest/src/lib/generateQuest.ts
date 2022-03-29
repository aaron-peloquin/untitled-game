import {db, pickArray, pickObject} from '@helper';
import {QUEST_TARGET_NAMES, QUEST_TARGET_PROFESSIONS, QUEST_TYPE} from '@static';
import {I_BaseQuest, I_Quest, T_generateQuestSig} from 'TS_Quest';

import {runSlayQuest} from './runSlayQuest';


export const generateQuest:T_generateQuestSig = (numberGenerator, gameSaveId, levelMin = 0.6, levelMax = 1.75) => {
  let questRunner;
  const type = pickArray(QUEST_TYPE, numberGenerator);
  const level = (numberGenerator() * (levelMax - levelMin) + levelMin).toFixed(2);

  const [ethnicity, targetNames] = pickObject(QUEST_TARGET_NAMES, numberGenerator);
  const name = pickArray(targetNames, numberGenerator);
  const profession = pickArray(QUEST_TARGET_PROFESSIONS[ethnicity], numberGenerator);


  const quest: I_BaseQuest = {
    gameSaveId,
    level: parseFloat(level),
    target: {
      ethnicity,
      name,
      profession,
    },
    type,
  };

  // switch (type) {
  //   default:
  //     questRunner = runSlayQuest(quest);
  // }

  // const questWithRunner: I_Quest = {
  //   ...quest,
  //   run: questRunner,
  // };

  return db.quests.add(quest);
};
