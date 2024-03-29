
declare module 'TS_General' {
  import {ReactNode} from "react"

  type T_GameSave = {
    gameSaveId: number
    currentSave: number
    name: string
    seed: string
    gameDatastoreName: string
    currentLocation: number
    pastLocations: number[]
    totalLocations: number
  }

  type T_GameSetting = {
    hidden: number
    label: string
    name: string
    type: 'number' | 'text',
    value: string
    otherFieldProps?: Record<string, any>
  }

  type T_KnownQuestTypes = 'slay' | 'follow'
  type T_KnownEthnicities = 'human' | 'goblin' | 'elf' | 'dwarf'
  type T_KnownPersonalities = 'brave' | 'leader' | 'clever'
  type T_KnownProfessions = 'farmer' | 'fighter' | 'rogue' | 'fisher' | 'butcher'
  
  type T_KnownStatBlocks = T_KnownEthnicities | T_KnownPersonalities | T_KnownProfessions


  type T_CardLayer = '1' | '2' | '3' | '4' | '5'

  type T_TwoItemNumberArray = [ number, number ]
  type T_TwoItemStringArray = [ string, string ]
  type T_TwoItemStringNodeArray = [ string, ReactNode ]
  type T_NumGenSig = () => number
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
