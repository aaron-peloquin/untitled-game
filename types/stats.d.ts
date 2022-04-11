declare module 'TS_Stats' {

  type T_Stats = {
    armor: number
    attack: number
    capture: number
    endurance: number
    goldHiring: number
    goldUpkeep: number
    stealth: number
    toHit: number
  }

  type T_ExportStats = {
    label: string
    stats: T_Stats
    onLevel: T_Stats
  }

  type T_KnownEthnicities = 'human'
  type T_KnownPersonalities = 'brave'
  type T_KnownProfessions = 'farmer' | 'fighter'
  
  type T_KnownStatBlocks = T_KnownEthnicities | T_KnownPersonalities | T_KnownProfessions
  
}