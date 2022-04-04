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
    statsVisible: boolean
  }

  type T_generateMercenaryArgs = {
    numberGenerator: T_NumGenSig
    gameSaveId: number
    levelRange: number[]
  }
  export type T_generateMercenarySig = (T_generateMercenaryArgs) => PromiseExtended<IndexableType>
}
