declare module 'TS_Quest' {
    import {I_Mercenary} from 'TS_Mercenary';
    export type T_QuestResult = {
        outcome: string
        rewards: {
          exp: number
          gold: number
        }
        roundsLog: string[]
      }

    export type T_RunQuestSig = (mercenary: I_Mercenary) => T_QuestResult

    export type T_FullRunQuestSig = (quest: I_BaseQuest) => T_RunQuestSig

    export interface I_BaseQuest {
      type: string
      level: number
      target: {
        name: string
        ethnicity: string
        profession: string
      }
    }

    export interface I_Quest extends I_BaseQuest {
      run: T_RunQuestSig
    }

  export type T_generateQuestSig = (levelMin: number, levelMax: number) => I_Quest

}
