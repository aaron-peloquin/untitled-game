import {T_ExportStats, T_Stats} from 'TS_Stats';

const baseStats: T_Stats = {
  _goldHiring: 1,
  _goldUpkeep: 0,
  attack: 1,
  cunning: 2,
  endurance: 1,
  subtlety: 1,
};

const levelUpGains: T_Stats = {
  _goldHiring: 2,
  _goldUpkeep: 1,
  attack: 1,
  cunning: 1,
  endurance: 0,
  subtlety: 1,
};

const statsData: T_ExportStats = {
  label: 'Human',
  onLevel: levelUpGains,
  stats: baseStats,
};

export default statsData;
