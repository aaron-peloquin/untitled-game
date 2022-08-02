import {getStats} from '@helper';
import {useState, useCallback, useEffect, useMemo} from 'react';
import {T_Band} from 'TS_Band';
import {T_Mercenary} from 'TS_Mercenary';

import {useGameData} from '../gameController/useGameData';
import {useGetGameSetting} from '../gameController/useGetGameSetting';
import {useListMercenariesById} from '../gameData/useListMercenariesById';

export const usePayWages = (band?: T_Band) => {
  const gameData = useGameData();
  const [wagesDue, setWagesDue] = useState(false);
  const bandDaysUntilWages = band?.daysUntilWages ?? false;
  const [checkedMercenaries, setCheckedMercenaries] = useState<number[]>([]);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);
  const hp_per_end = useGetGameSetting('hp_per_end');

  useEffect(() => {
    if (band?.mercenaryIds.length) {
      setCheckedMercenaries(band.mercenaryIds);
    }
  }, [band?.mercenaryIds]);

  useEffect(() => {
    if (!wagesDue && bandDaysUntilWages === 0) {
      setWagesDue(true);
    } else if (bandDaysUntilWages > 0) {
      setWagesDue(false);
    }
  }, [bandDaysUntilWages, wagesDue]);

  const receipt = useMemo(() => {
    const upkeepMercenaries: T_Mercenary[] = bandMercenaries?.filter((mercenary) => checkedMercenaries.indexOf(mercenary.mercenaryId) !== -1) || [];

    return upkeepMercenaries.map((mercenary) => {
      if (hp_per_end) {
        const hpMultiplier = parseInt(hp_per_end.value);
        const stats = getStats(mercenary.level, hpMultiplier, mercenary.ethnicity, mercenary.profession, mercenary.personality);
        return {name: mercenary.name, wage: stats._goldUpkeep};
      }
      return {name: 'Loading...', wage: 0};
    });
  }, [bandMercenaries, checkedMercenaries, hp_per_end]);

  const totalAmount = useMemo(() => receipt.reduce((total, {wage}) => total += wage, 0), [receipt]);

  const canAffordWages = (band?.gold || 0) >= totalAmount;

  const wagesDone = useCallback(() => {
    const gold = (band?.gold || 0) - totalAmount;
    gameData.dataStore?.band.update(band?.bandId || 1, {daysUntilWages: 5, gold, mercenaryIds: checkedMercenaries});
    setWagesDue(false);
  }, [band?.bandId, band?.gold, checkedMercenaries, gameData.dataStore?.band, totalAmount]);

  return {bandMercenaries, canAffordWages, checkedMercenaries, receipt, setCheckedMercenaries, totalAmount, wagesDone, wagesDue};
};
