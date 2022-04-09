import {T_ProfessionStats, T_Stats} from 'TS_Stats';

const stats: T_Stats = {
  armor: 8,
  attack: 1,
  capture: 8,
  endurance: 8,
  goldHiring: 3,
  goldUpkeep: 1,
  stealth: 7,
  toHit: 8,
};

const onLevel: T_Stats = {
  armor: 1,
  attack: 2,
  capture: 2,
  endurance: 2,
  goldHiring: 2,
  goldUpkeep: 1,
  stealth: -1,
  toHit: 2,
};


const professionStats: T_ProfessionStats = {
  label: 'Fighter',
  onLevel,
  stats,
  type: 'mercenary',
};

export default professionStats;
