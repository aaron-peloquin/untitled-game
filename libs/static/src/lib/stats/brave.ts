import {T_ExportStats, T_Stats} from 'TS_Stats';

const baseStats: T_Stats = {
  armor: 1,
  attack: 2,
  capture: 2,
  endurance: 0,
  goldHiring: 3,
  goldUpkeep: 2,
  stealth: -1,
  toHit: 2,
};

const levelUpGains: T_Stats = {
  armor: 0,
  attack: 1,
  capture: 1,
  endurance: 0,
  goldHiring: 1,
  goldUpkeep: 1,
  stealth: 1,
  toHit: 1,
};

const statsData: T_ExportStats = {
  label: 'Human',
  onLevel: levelUpGains,
  stats: baseStats,
};

export default statsData;
