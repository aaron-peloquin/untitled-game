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
  armor: 8,
  attack: 1,
  baseCost: 2,
  capture: 8,
  endurance: 8,
  stealth: 8,
  toHit: 8,
};


const level2: T_Stats = {
  armor: 9,
  attack: 2,
  baseCost: 3,
  capture: 9,
  endurance: 9,
  stealth: 9,
  toHit: 9,
};

const level3: T_Stats = {
  armor: 10,
  attack: 3,
  baseCost: 5,
  capture: 10,
  endurance: 10,
  stealth: 10,
  toHit: 10,
};

const level4: T_Stats = {
  armor: 11,
  attack: 4,
  baseCost: 8,
  capture: 11,
  endurance: 11,
  stealth: 11,
  toHit: 11,
};

const level5: T_Stats = {
  armor: 12,
  attack: 6,
  baseCost: 10,
  capture: 12,
  endurance: 12,
  stealth: 12,
  toHit: 12,
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
