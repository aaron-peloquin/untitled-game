import {allStats} from '@static';
import _ = require('lodash');
import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions, T_Stats} from 'TS_Stats';

type getStatsSig = (level: number, ethnicity: T_KnownEthnicities, profession: T_KnownProfessions, personality?: T_KnownPersonalities) => T_Stats
const getStats:getStatsSig = (level, ethnicity, profession, personality) => {
  const defaultStats: T_Stats = {
    armor: 0,
    attack: 0,
    capture: 0,
    endurance: 0,
    goldHiring: 0,
    goldUpkeep: 0,
    stealth: 0,
    toHit: 0,
  };
  const ethnicityStats = allStats[ethnicity];
  const professionStats = allStats[profession];
  const basicStatsArray = [ethnicityStats.stats, professionStats.stats];
  if (personality) {
    const personalityStats = allStats[personality];
    basicStatsArray.push(personalityStats.stats);
  }
  const statBlock = basicStatsArray.reduce((stats, newStats) => {
    // eslint-disable-next-line guard-for-in
    for (const newStat in newStats) {
      const currentValue = _.get(stats, newStat);
      const addValue = _.get(newStats, newStat);
      _.set(stats, newStat, currentValue + addValue);
    }
    return stats;
  }, defaultStats);
  //   const ethnicityStats = allStats[personality];
  console.log({ethnicity, level, profession, statBlock});

  return allStats.brave.onLevel;
};

export {getStats};
