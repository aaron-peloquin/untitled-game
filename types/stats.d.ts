declare module 'TS_Stats' {

  type T_Stats = {
    _goldHiring: number
    _goldUpkeep: number
    attack: number
    cunning: number
    endurance: number
    subtlety : number
  }

  type T_ParsedStats = {
    maxHealth: number
    ethnicity: string
    profession: string
  } & T_Stats
  
  type T_ExportStats = {
    label: string
    color: string
    stats: T_Stats
    onLevel: T_Stats
  }

  type T_KnownEthnicities = 'human'
  type T_KnownPersonalities = 'brave' | 'leader'
  type T_KnownProfessions = 'farmer' | 'fighter'
  
  type T_KnownStatBlocks = T_KnownEthnicities | T_KnownPersonalities | T_KnownProfessions
  
}