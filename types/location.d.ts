declare module 'TS_Location' {
  import {T_NumGenSig, T_TwoItemNumberArray} from 'TS_General';
  import {IndexableType, PromiseExtended} from 'dexie'

  type T_Location = {
    locationId?: number
    level: number
    levelRanges: T_TwoItemNumberArray
    mercenaries: number[]
    name: string
    quests: number[]
    relatedLocations: number[]
  }

  type T_createLocationSig = (locationNumGenerator: T_NumGenSig, gameSaveId: number, levelMin: number, levelMax: number) => PromiseExtended<IndexableType>
}
