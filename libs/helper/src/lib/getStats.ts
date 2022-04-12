import {allStats} from '@static';
import _ = require('lodash');
import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions, T_Stats} from 'TS_Stats';

type getStatsSig = (level: number, ethnicity: T_KnownEthnicities, profession: T_KnownProfessions, personality?: T_KnownPersonalities) => T_Stats
const getStats:getStatsSig = _.memoize((level, ethnicity, profession, personality) => {
  const defaultStats: T_Stats = {armor: 0, attack: 0, capture: 0, endurance: 0, _goldHiring: 0, _goldUpkeep: 0, stealth: 0, toHit: 0};
  const ethnicityStats = allStats[ethnicity];
  const professionStats = allStats[profession];
  const basicStatsArray = [ethnicityStats.stats, professionStats.stats];
  const levelingStats = [ethnicityStats.onLevel, professionStats.onLevel];

  if (personality) {
    const personalityStats = allStats[personality];
    basicStatsArray.push(personalityStats.stats);
    levelingStats.push(personalityStats.onLevel);
  }
  if (level > 1) {
    const levelUpStats = levelingStats.reduce((stats, newStats) => {
      // eslint-disable-next-line guard-for-in
      for (const newStat in newStats) {
        const currentValue = _.get(stats, newStat);
        const addValue = _.get(newStats, newStat);
        const newValue = Math.floor(currentValue + (addValue * level));
        _.set(stats, newStat, newValue);
      }
      return stats;
    }, {...defaultStats});
    basicStatsArray.push(levelUpStats);
  }
  const statBlock = basicStatsArray.reduce((stats, newStats) => {
    // eslint-disable-next-line guard-for-in
    for (const newStat in newStats) {
      const currentValue = _.get(stats, newStat);
      const addValue = _.get(newStats, newStat);
      _.set(stats, newStat, currentValue + addValue);
    }
    return stats;
  }, {...defaultStats});

  return statBlock;
});

export {getStats};
