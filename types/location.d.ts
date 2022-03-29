declare module 'TS_Location' {
  import {T_Mercenary} from 'TS_Mercenary';
  import {I_Quest} from 'TS_Quest';
  
  export type T_Location = {
    id?: number
    name: string
    gameSaveId: number
    level: number
    levelRanges: number[]
    quests: number[]
    mercenaries: number[]
  }

  export type T_generateLocationSig = (locationNumGenerator: T_NumGenSig, gameSaveId: number, levelMin: number, levelMax: number) => PromiseExtended<IndexableType>
}
