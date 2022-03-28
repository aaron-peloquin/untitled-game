declare module 'TS_General' {
  import {T_BandController} from 'TS_Band'
  import {T_generateSeededLocationSig} from "TS_Location"
  export type T_GameData = {
    bandController: T_BandController

    seed: string
    setSeed?: (seed: string)=>void
    seededLocationGenerator?: T_generateSeededLocationSig

    currentLocation: I_Location,
    pastLocations: I_Location[],
    setCurrentLocation?: (newLocation:I_Location) => void
  }
    
  export type T_NumGenSig = () => number
}
