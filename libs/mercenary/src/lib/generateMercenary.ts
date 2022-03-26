import {pickArray, pickObject, pickRange} from '@helper';
import {MERC_CLASS, MERC_CLASS_BASE_STATS, MERC_ETHNICITY_BASE_STATS, MERC_NAMES} from '@static';
import { I_Mercenary, T_BaseStats } from 'TS_Mercenary';

export const generateMercenary = (numberGenerator: () => number = Math.random) => (levelMin=1, levelMax=3):I_Mercenary => {
  const rangeGenerator = pickRange(numberGenerator);

  const level = rangeGenerator(levelMin, levelMax);
  const [ethnicity, mercClasses] = pickObject(MERC_CLASS, numberGenerator);
  const name = pickArray(MERC_NAMES[ethnicity], numberGenerator);
  const profession = pickArray(mercClasses, numberGenerator);

  const baseProfessionStats = MERC_CLASS_BASE_STATS[profession];
  const baseEthnicityStats = MERC_ETHNICITY_BASE_STATS[ethnicity];
  const baseStats: T_BaseStats = {
    cost: baseProfessionStats.cost + baseEthnicityStats.cost,
    attack: baseProfessionStats.attack + baseEthnicityStats.attack,
    endurance: baseProfessionStats.endurance + baseEthnicityStats.endurance,
    stealth: baseProfessionStats.stealth + baseEthnicityStats.stealth,
    capture: baseProfessionStats.capture + baseEthnicityStats.capture,
  }

  const baseHealth = (baseStats.endurance * rangeGenerator(0, 1.5))
  const health = baseHealth * level;

  return {   
    originalHealth: health,
    stats: baseStats,
    originalStats: baseStats,
    ethnicity,
    health,
    level,
    name,
    profession,
  };
};
