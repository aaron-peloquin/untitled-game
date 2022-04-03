declare module 'TS_General' {
  import {T_Band} from 'TS_Band'
  
  export type T_GameSave = {
    id?: number
    currentSave: number
    name: string
    seed: string
    band: T_Band
    currentLocation: number
    pastLocations: number[]
  }

  export type T_NumGenSig = () => number
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}