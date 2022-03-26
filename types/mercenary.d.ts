declare module 'TS_Mercenary' {
  interface I_Mercenary {
    name: string
    profession: string
    damage: number[]
    cost: number
    level: number
    health: number
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
