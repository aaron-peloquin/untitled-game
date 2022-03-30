declare module 'TS_Band' {
  import {T_Mercenary} from 'TS_Mercenary';
  
  export type T_Band = {
    gold: number,
    mercenaries: number[],
    name: string
  }
  
  export type bandSig = () => T_BandController
}
