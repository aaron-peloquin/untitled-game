declare module 'TS_General' {

  type T_GameSave = {
    id?: number
    currentSave: number
    name: string
    seed: string
    gameDatastoreName: string
    currentLocation: number
    pastLocations: number[]
  }

  type T_TwoItemNumberArray = [ number, number ]
  type T_NumGenSig = () => number
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
