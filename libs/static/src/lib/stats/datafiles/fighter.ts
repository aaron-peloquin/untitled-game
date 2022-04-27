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
  cunning: 0,
  endurance: 1,
  subtlety: 0,
};


const professionStats: T_ExportStats = {
  color: 'red',
  label: 'Fighter',
  onLevel,
  stats,
};

export default professionStats;
