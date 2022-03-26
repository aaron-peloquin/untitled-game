declare module 'TS_Mercenary' {
  interface I_Mercenary {
    name: string
    profession: string
    stats: T_BaseStats
    level: number
    health: number
    originalHealth: number
    originalStats: T_BaseStats
    ethnicity: string
  }

  export type T_BaseStats = {
    cost: number
    attack: number
    endurance: number
    stealth: number
    capture: number
  }
}
