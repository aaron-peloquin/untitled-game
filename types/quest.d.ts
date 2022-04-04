declare module 'TS_Quest' {
  import {T_Mercenary} from 'TS_Mercenary';
  import {T_TwoItemNumberArray} from 'TS_General';
  export type I_QuestResult = {
      outcome: string
      rewards: {
        exp: number
        gold: number
      }
      roundsLog: string[]
    }

  export type T_RunQuestSig = (mercenary: T_Mercenary) => I_QuestResult
  export type T_FullRunQuestSig = (quest: I_BaseQuest) => T_RunQuestSig

  export interface I_BaseQuest {
    id?: number
    gameSaveId: number
    type: string
    level: number
    target: {
      name: string
      ethnicity: string
      profession: string
    }
  }

  type T_generateQuestArgs = {
    numberGenerator: T_NumGenSig
    gameSaveId: number
    levelRange: T_TwoItemNumberArray
  }

  export type T_generateQuestSig = (T_generateQuestArgs) => PromiseExtended<IndexableType>
}
