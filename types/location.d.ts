declare module 'TS_Location' {
  import {T_NumGenSig, T_TwoItemNumberArray} from 'TS_General';
  import {IndexableType, PromiseExtended} from 'dexie'

  type T_Location = {
    locationId: number
    level: number
    levelRange: T_TwoItemNumberArray
    mercenaryIds: number[]
    name: string
    questIds: number[]
    relatedLocationIds: number[]
  }

  type T_createLocationSig = (locationNumGenerator: T_NumGenSig, gameSaveId: number, levelMin: number, levelMax: number) => PromiseExtended<IndexableType>
}
