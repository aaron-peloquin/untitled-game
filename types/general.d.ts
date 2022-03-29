declare module 'TS_General' {
  import {T_Mercenary} from 'TS_Mercenary'
  import {T_Band} from 'TS_Band'
  export type T_GameSave = {
    id?: number
    name: string
    seed: string
    band: T_Band
    currentLocation: T_Location
    pastLocations: T_Location[]
  }
    export type T_NumGenSig = () => number
}
