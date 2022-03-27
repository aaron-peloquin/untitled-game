declare module 'TS_Band' {
  import {I_Mercenary} from 'TS_Mercenary';
  
  export interface I_Band {
    gold: number,
    mercenaries: I_Mercenary[],
    name: string
  }
  
  export type bandSig = () => I_Band
}
