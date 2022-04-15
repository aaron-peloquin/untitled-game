declare module 'TS_Band' {
 
  type T_Band = {
    bandId: number
    seed: string
    currentLocationId: number
    gold: number,
    mercenaryIds: number[],
    name: string
    level: number
  }

  type createBandSig = (name: string, seed: string) => T_Band
}
