import {T_ExportStats, T_Stats} from 'TS_Stats';

const stats: T_Stats = {
  _goldHiring: 1,
  _goldUpkeep: 1,
  attack: 6,
  cunning: 5,
  endurance: 6,
  subtlety: 2,
};


const onLevel: T_Stats = {
  _goldHiring: 1,
  _goldUpkeep: 0,
  attack: 1,
  cunning: 0,
  endurance: 2,
  subtlety: 0,
};

const professionStats: T_ExportStats = {
  color: 'cornflowerblue',
  label: 'Fisher',
  onLevel,
  stats,
};

export default professionStats;
