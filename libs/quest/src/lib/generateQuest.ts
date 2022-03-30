import {db, pickArray, pickObject} from '@helper';
import {QUEST_TARGET_NAMES, QUEST_TARGET_PROFESSIONS, QUEST_TYPE} from '@static';
import {I_BaseQuest, T_generateQuestSig} from 'TS_Quest';


export const generateQuest:T_generateQuestSig = (numberGenerator, gameSaveId, levelMin = 0.6, levelMax = 1.75) => {
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

  return db.quests.add(quest);
};
