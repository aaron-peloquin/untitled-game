declare module 'TS_Mercenary' {

  export type T_BaseStats = {
    cost: number
    attack: number
    endurance: number
    stealth: number
    capture: number
  }
  interface T_Mercenary {
    id?: number
    gameSaveId: number
    name: string
    profession: string
    stats: T_BaseStats
    level: number
    health: number
    originalHealth: number
    originalStats: T_BaseStats
    ethnicity: string
  }


  export type T_generateMercenarySig = (levelMin: number, levelMax: number) => T_Mercenary
 
}
