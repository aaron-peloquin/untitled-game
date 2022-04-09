declare module 'TS_Band' {
 
  type T_Band = {
    bandId?: number
    seed: string
    currentLocation: number
    gold: number,
    mercenaries: number[],
    name: string
  }

  type createBandSig = (name: string, seed: string) => T_Band
}
