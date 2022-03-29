declare module 'TS_Location' {
  import {T_Mercenary} from 'TS_Mercenary';
  import {I_Quest} from 'TS_Quest';
  
  export type T_Location = {
    id?: number
    name: string
    gameSaveId: number
    level: number
    levelRanges: number[]
    quests: I_Quest[]
    mercenaries: T_Mercenary[]
  }

  export type T_generateSeededLocationSig = (levelMin: number, levelMax: number) => T_Location
  export type T_generateLocationSig = (locationNumGenerator: T_NumGenSig, generateMercenary: T_generateMercenarySig, generateQuest:T_generateQuestSig) => T_generateSeededLocationSig
}
