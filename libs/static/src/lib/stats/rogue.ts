import {T_ExportStats, T_Stats} from 'TS_Stats';

const stats: T_Stats = {
  _goldHiring: 4,
  _goldUpkeep: 1,
  attack: 8,
  cunning: 9,
  endurance: 5,
  subtlety: 10,
};

const onLevel: T_Stats = {
  _goldHiring: 3,
  _goldUpkeep: 2,
  attack: 1,
  cunning: 2,
  endurance: 0,
  subtlety: 2,
};


const professionStats: T_ExportStats = {
  color: 'forestgreen',
  label: 'Rogue',
  onLevel,
  stats,
};

export default professionStats;
