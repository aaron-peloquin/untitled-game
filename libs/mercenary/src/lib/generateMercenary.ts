import {db, pickArray, pickObject, pickRange} from '@helper';
import {MERC_CLASS, MERC_CLASS_BASE_STATS, MERC_ETHNICITY_BASE_STATS, MERC_NAMES} from '@static';
import {T_BaseStats, T_generateMercenarySig} from 'TS_Mercenary';

export const generateMercenary: T_generateMercenarySig = ({numberGenerator, gameSaveId, levelRanges}) => {
  const rangeGenerator = pickRange(numberGenerator);

  const level = rangeGenerator(levelRanges[0], levelRanges[1]);
  const [ethnicity, mercClasses] = pickObject(MERC_CLASS, numberGenerator);
  const name = pickArray(MERC_NAMES[ethnicity], numberGenerator);
  const profession = pickArray(mercClasses, numberGenerator);

  const baseProfessionStats = MERC_CLASS_BASE_STATS[profession];
  const baseEthnicityStats = MERC_ETHNICITY_BASE_STATS[ethnicity];
  const baseStats: T_BaseStats = {
    attack: baseProfessionStats.attack + baseEthnicityStats.attack,
    capture: baseProfessionStats.capture + baseEthnicityStats.capture,
    cost: Math.round(baseProfessionStats.cost + baseEthnicityStats.cost + rangeGenerator(-1, 1) + level),
    endurance: baseProfessionStats.endurance + baseEthnicityStats.endurance,
    stealth: baseProfessionStats.stealth + baseEthnicityStats.stealth,
  };

  const baseHealth = (baseStats.endurance * rangeGenerator(0, 1.5));
  const health = baseHealth * level;

  const mercenary = {
    ethnicity,
    gameSaveId,
    health,
    level,
    name,
    originalHealth: health,
    originalStats: baseStats,
    profession,
    stats: baseStats,
    statsVisible: false,
  };

  return db.mercenaries.add(mercenary);
};
