import {allStats} from '@static';
import * as _ from 'lodash';
import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions, T_ParsedStats, T_Stats} from 'TS_Stats';

export const defaultStats: T_ParsedStats = {_goldHiring: 0, _goldUpkeep: 0, attack: 0, cunning: 0, endurance: 0, ethnicity: '', maxHealth: 0, profession: '', subtlety: 0};

type getStatsSig = (level: number, hpMultipler: number, ethnicity: T_KnownEthnicities, profession: T_KnownProfessions, personality?: T_KnownPersonalities) => T_ParsedStats
const getStats:getStatsSig = _.memoize((level, hpMultipler, ethnicity, profession, personality) => {
  const ethnicityData = allStats[ethnicity];
  const professionData = allStats[profession];
  const basicStatsArray = [ethnicityData.stats, professionData.stats];
  const levelingStats = [ethnicityData.onLevel, professionData.onLevel];

  if (personality) {
    const personalityStats = allStats[personality];
    basicStatsArray.push(personalityStats.stats);
    levelingStats.push(personalityStats.onLevel);
  }
  if (level >= 1) {
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

  return {
    ...statBlock,
    ethnicity: ethnicityData.label,
    maxHealth: statBlock.endurance * hpMultipler,
    profession: professionData.label,
  };
});

export {getStats};
