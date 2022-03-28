import {pickArray, pickObject, pickRange} from '@helper';
import {MERC_CLASS, MERC_CLASS_BASE_STATS, MERC_ETHNICITY_BASE_STATS, MERC_NAMES} from '@static';
import { uniqueId } from 'lodash';
import {T_NumGenSig} from 'TS_General';
import {T_BaseStats, T_generateMercenarySig} from 'TS_Mercenary';
import { v4 as uuidv4 } from 'uuid';


export const generateMercenary = (numberGenerator: T_NumGenSig):T_generateMercenarySig => (levelMin = 1, levelMax = 3) => {
  const uniqueId = numberGenerator()
  const rangeGenerator = pickRange(numberGenerator);

  const level = rangeGenerator(levelMin, levelMax);
  const [ethnicity, mercClasses] = pickObject(MERC_CLASS, numberGenerator);
  const name = pickArray(MERC_NAMES[ethnicity], numberGenerator);
  const profession = pickArray(mercClasses, numberGenerator);

  const baseProfessionStats = MERC_CLASS_BASE_STATS[profession];
  const baseEthnicityStats = MERC_ETHNICITY_BASE_STATS[ethnicity];
  const baseStats: T_BaseStats = {
    attack: baseProfessionStats.attack + baseEthnicityStats.attack,
    capture: baseProfessionStats.capture + baseEthnicityStats.capture,
    cost: baseProfessionStats.cost + baseEthnicityStats.cost,
    endurance: baseProfessionStats.endurance + baseEthnicityStats.endurance,
    stealth: baseProfessionStats.stealth + baseEthnicityStats.stealth,
  };

  const baseHealth = (baseStats.endurance * rangeGenerator(0, 1.5));
  const health = baseHealth * level;

  const result = {
    ethnicity,
    health,
    mercenaryId: uniqueId,
    level,
    name,
    originalHealth: health,
    originalStats: baseStats,
    profession,
    stats: baseStats,
  };

  return result;
};
