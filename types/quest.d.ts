declare module 'TS_Quest' {
  import {T_Mercenary} from 'TS_Mercenary';
  import {T_TwoItemNumberArray} from 'TS_General';
  export type T_QuestLogItem = {
    // ${noun} ${verb}
    noun: string
    verb: string
  }
  export type T_QuestResult = {
      outcome: string
      rewards: {
        bandExp: number
        mercenaryExp: number
        gold: number
      }
      roundsLog: T_Round[]
    }

  export type T_RunQuestSig = (quest: I_BaseQuest, mercenary: T_Mercenary) => I_QuestResult

  export interface I_BaseQuest {
    id?: number
    level: number
    type: string
    targetName: string
    targetEthnicity: string
    targetProfession: string
}

  type T_generateQuestArgs = {
    numberGenerator: T_NumGenSig
    gameSaveId: number
    levelRange: T_TwoItemNumberArray
  }

  export type T_generateQuestSig = (T_generateQuestArgs) => PromiseExtended<IndexableType>
}
