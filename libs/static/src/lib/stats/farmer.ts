import {T_ExportStats, T_Stats} from 'TS_Stats';

const stats: T_Stats = {
  armor: 2,
  attack: 1,
  capture: 1,
  endurance: 6,
  goldHiring: 1,
  goldUpkeep: 0,
  stealth: 2,
  toHit: 8,
};


const onLevel: T_Stats = {
  armor: 1,
  attack: 2,
  capture: 2,
  endurance: 2,
  goldHiring: 1,
  goldUpkeep: 1,
  stealth: -1,
  toHit: 2,
};

const professionStats: T_ExportStats = {
  label: 'Farmer',
  onLevel,
  stats,
};

export default professionStats;
