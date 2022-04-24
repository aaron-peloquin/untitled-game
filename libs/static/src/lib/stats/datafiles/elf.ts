import {T_ExportStats, T_Stats} from 'TS_Stats';

const baseStats: T_Stats = {
  _goldHiring: 3,
  _goldUpkeep: 0,
  attack: 0,
  cunning: 2,
  endurance: 0,
  subtlety: 2,
};

const levelUpGains: T_Stats = {
  _goldHiring: 2,
  _goldUpkeep: 1,
  attack: 0,
  cunning: 1,
  endurance: 1,
  subtlety: 2,
};

const statsData: T_ExportStats = {
  color: 'darkolivegreen',
  label: 'Elf',
  onLevel: levelUpGains,
  stats: baseStats,
};

export default statsData;
