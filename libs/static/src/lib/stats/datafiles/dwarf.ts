import {T_ExportStats, T_Stats} from 'TS_Stats';

const baseStats: T_Stats = {
  _goldHiring: 3,
  _goldUpkeep: 0,
  attack: 2,
  cunning: 0,
  endurance: 3,
  subtlety: 0,
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
  color: 'grey',
  label: 'Dwarf',
  onLevel: levelUpGains,
  stats: baseStats,
};

export default statsData;
