import {T_ExportStats, T_Stats} from 'TS_Stats';

const baseStats: T_Stats = {
  _goldHiring: 2,
  _goldUpkeep: 2,
  attack: 2,
  cunning: 0,
  endurance: 1,
  subtlety: -2,
};

const levelUpGains: T_Stats = {
  _goldHiring: 1,
  _goldUpkeep: 1,
  attack: 1,
  cunning: 0,
  endurance: 1,
  subtlety: 0,
};

const statsData: T_ExportStats = {
  color: '',
  label: 'Brave',
  onLevel: levelUpGains,
  stats: baseStats,
};

export default statsData;
