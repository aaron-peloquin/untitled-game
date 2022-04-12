import {T_ExportStats, T_Stats} from 'TS_Stats';

const stats: T_Stats = {
  _goldHiring: 3,
  _goldUpkeep: 1,
  attack: 8,
  cunning: 8,
  endurance: 8,
  subtlety: 8,
};

const onLevel: T_Stats = {
  _goldHiring: 2,
  _goldUpkeep: 1,
  attack: 2,
  cunning: 2,
  endurance: 2,
  subtlety: 1,
};


const professionStats: T_ExportStats = {
  label: 'Fighter',
  onLevel,
  stats,
};

export default professionStats;
