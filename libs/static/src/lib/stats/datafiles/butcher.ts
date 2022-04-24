import {T_ExportStats, T_Stats} from 'TS_Stats';

const stats: T_Stats = {
  _goldHiring: 1,
  _goldUpkeep: 2,
  attack: 7,
  cunning: 4,
  endurance: 6,
  subtlety: 6,
};


const onLevel: T_Stats = {
  _goldHiring: 1,
  _goldUpkeep: 1,
  attack: 2,
  cunning: 0,
  endurance: 1,
  subtlety: 1,
};

const professionStats: T_ExportStats = {
  color: 'darkred',
  label: 'Butcher',
  onLevel,
  stats,
};

export default professionStats;
