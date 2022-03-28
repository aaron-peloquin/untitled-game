declare module 'TS_Band' {
  import {I_Mercenary} from 'TS_Mercenary';
  
  export interface T_Band {
    gold: number,
    mercenaries: I_Mercenary[],
    name: string
  }

  export interface T_BandController {
    data: T_Band
    addMercenary: (addMercenary:I_Mercenary) => void
    removeMercenary: (removeMercenary:I_Mercenary) => void
    adjustGold: (amount: number) => void
  }
  
  export type bandSig = () => T_BandController
}
