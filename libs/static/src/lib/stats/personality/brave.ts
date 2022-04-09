type T_Stats = {
  armor: number
  attack: number
  baseCost: number
  capture: number
  endurance: number
  stealth: number
  toHit: number
}

const level1: T_Stats = {
  armor: 1,
  attack: 2,
  baseCost: 2,
  capture: 0,
  endurance: 2,
  stealth: -1,
  toHit: 2,
};


const level2: T_Stats = {
  armor: 1,
  attack: 2,
  baseCost: 2,
  capture: 0,
  endurance: 2,
  stealth: -1,
  toHit: 2,
};

const level3: T_Stats = {
  armor: 1,
  attack: 2,
  baseCost: 2,
  capture: 0,
  endurance: 2,
  stealth: -1,
  toHit: 2,
};

const level4: T_Stats = {
  armor: 1,
  attack: 2,
  baseCost: 2,
  capture: 0,
  endurance: 2,
  stealth: -1,
  toHit: 2,
};

const level5: T_Stats = {
  armor: 1,
  attack: 2,
  baseCost: 2,
  capture: 0,
  endurance: 2,
  stealth: -1,
  toHit: 2,
};

export default {
  label: 'Human',
  levels: {
    1: level1,
    2: level2,
    3: level3,
    4: level4,
    5: level5,
  },
};
