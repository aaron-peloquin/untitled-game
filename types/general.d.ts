declare module 'TS_General' {

  type T_GameSave = {
    gameSaveId: number
    currentSave: number
    name: string
    seed: string
    gameDatastoreName: string
    currentLocation: number
    pastLocations: number[]
  }

  type T_GameSetting = {
    hidden: number
    label: string
    name: string
    type: 'number' | 'text',
    value: string
  }

  type T_CardLayer = '1' | '2' | '3' | '4' | '5'

  type T_TwoItemNumberArray = [ number, number ]
  type T_NumGenSig = () => number
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
