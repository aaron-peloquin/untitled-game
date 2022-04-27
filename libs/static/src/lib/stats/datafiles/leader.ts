import {T_ExportStats, T_Stats} from 'TS_Stats';

const baseStats: T_Stats = {
  _goldHiring: 4,
  _goldUpkeep: 2,
  attack: 1,
  cunning: 1,
  endurance: 1,
  subtlety: 1,
};

const levelUpGains: T_Stats = {
  _goldHiring: 2,
  _goldUpkeep: 2,
  attack: 1,
  cunning: 1,
  endurance: 1,
  subtlety: 1,
};

const statsData: T_ExportStats = {
  color: '',
  label: 'Brave',
  onLevel: levelUpGains,
  stats: baseStats,
};

export default statsData;
