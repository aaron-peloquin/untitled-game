declare module 'TS_Location' {
  import {I_Mercenary} from 'TS_Mercenary';
  import {I_Quest} from 'TS_Quest';
  
  export interface I_Location {
    name: string
    level: number
    levelRanges: number[]
    quests: I_Quest[]
    mercenaries: I_Mercenary[]
  }

  export type T_generateSeededLocationSig = (levelMin: number, levelMax: number) => I_Location
  export type T_generateLocationSig = (locationNumGenerator: T_NumGenSig, generateMercenary: T_generateMercenarySig, generateQuest:T_generateQuestSig) => T_generateSeededLocationSig
}
