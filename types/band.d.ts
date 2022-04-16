declare module 'TS_Band' {
 
  type T_Band = {
    bandId: number
    actionPoints: number
    currentLocationId: number
    daysUntilWages: number
    gold: number,
    level: number
    mercenaryIds: number[],
    name: string
    seed: string
  }

  type createBandSig = (name: string, seed: string) => T_Band
}
