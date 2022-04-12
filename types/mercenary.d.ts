
declare module 'TS_Mercenary' {
  import {T_NumGenSig} from "TS_General"
  import {IndexableType, PromiseExtended} from "dexie"
  import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions} from "TS_Stats"

  interface T_Mercenary {
    mercenaryId: number
    currentHealth: number
    ethnicity: T_KnownEthnicities
    level: number
    name: string
    personality: T_KnownPersonalities
    profession: T_KnownProfessions
    statsVisible: boolean
  }

  type T_createMercenaryArgs = {
    numberGenerator: T_NumGenSig
    levelRange: number[]
  }
  export type T_createMercenarySig = (T_createMercenaryArgs) => PromiseExtended<IndexableType>
}
