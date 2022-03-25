import {pickArray, pickObject, pickRange} from '@helper';
import {MERC_CLASS, MERC_CLASS_BASE_STATS, MERC_NAMES} from '@static';
import {I_Mercenary} from 'TS_Mercenary';

export const generateMercenary = (numberGenerator: () => number = Math.random) => (levelMin=1, levelMax=3):I_Mercenary => {
  const rangeGenerator = pickRange(numberGenerator);

  const level = rangeGenerator(levelMin, levelMax);
  const [ethnicity, mercClasses] = pickObject(MERC_CLASS, numberGenerator);
  const name = pickArray(MERC_NAMES[ethnicity], numberGenerator);
  const profession = pickArray(mercClasses, numberGenerator);

  const baseStats = MERC_CLASS_BASE_STATS[profession];
  const dmgLow = baseStats.damage ^ level;
  const dmgHigh = dmgLow * baseStats.damageMultiplier;
  const daWizard = [
    rangeGenerator(dmgLow, dmgHigh),
    rangeGenerator(dmgLow, dmgHigh),
  ].sort();

  const endLow = baseStats.endurance ^ level;
  const endHigh = endLow * baseStats.enduranceMultiplier;
  const health = rangeGenerator(endLow, endHigh);

  const cost = health + (daWizard[0]+daWizard[1]);

  return {
    cost,
    damage: daWizard,
    ethnicity,
    health,
    level,
    name,
    profession,
  };
};
