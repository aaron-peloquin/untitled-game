declare module 'TS_Mercenary' {
  import {T_NumGenSig} from "TS_General"
  export type T_BaseStats = {
    cost: number
    attack: number
    endurance: number
    stealth: number
    capture: number
  }
  interface T_Mercenary {
    id?: number
    gameSaveId: number
    name: string
    profession: string
    stats: T_BaseStats
    level: number
    health: number
    originalHealth: number
    originalStats: T_BaseStats
    ethnicity: string
  }

  export type T_generateMercenarySig = (numberGenerator: T_NumGenSig, gameSaveId: number, levelMin: number, levelMax: number) => PromiseExtended<IndexableType>
}
