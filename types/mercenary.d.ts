
declare module 'TS_Mercenary' {
  import {T_NumGenSig} from "TS_General"
  import {IndexableType, PromiseExtended} from "dexie"

  interface T_Mercenary {
    id?: number
    currentHealth: number
    ethnicity: string
    level: number
    name: string
    profession: string
    personality: string
    statsVisible: boolean
  }

  type T_createMercenaryArgs = {
    numberGenerator: T_NumGenSig
    levelRange: number[]
  }
  export type T_createMercenarySig = (T_createMercenaryArgs) => PromiseExtended<IndexableType>
}
