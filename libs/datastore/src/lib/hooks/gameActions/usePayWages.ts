import {getStats} from '@helper';
import {useState, useCallback, useEffect, useMemo} from 'react';
import {T_Band} from 'TS_Band';
import {T_Mercenary} from 'TS_Mercenary';

import {useGameData} from '../gameController/useGameData';
import {useListMercenariesById} from '../gameData/useListMercenariesById';

export const usePayWages = (band?: T_Band) => {
  const gameData = useGameData();
  const [wagesDue, setWagesDue] = useState(false);
  const bandDaysUntilWages = band?.daysUntilWages ?? 0;
  const [checkedMercenaries, setCheckedMercenaries] = useState<number[]>([]);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

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
      const stats = getStats(mercenary.level, 0, mercenary.ethnicity, mercenary.profession, mercenary.personality);
      return {name: mercenary.name, wage: stats._goldUpkeep};
    });
  }, [bandMercenaries, checkedMercenaries]);

  const totalAmount = useMemo(() => receipt.reduce((total, {wage}) => total += wage, 0), [receipt]);

  const canAffordWages = (band?.gold || 0) >= totalAmount;

  const wagesDone = useCallback(() => {
    gameData.dataStore?.band.update(band?.bandId || 1, {daysUntilWages: 5, mercenaryIds: checkedMercenaries});
    setWagesDue(false);
    console.log(checkedMercenaries, receipt);
  }, [band?.bandId, checkedMercenaries, gameData.dataStore?.band, receipt]);

  return {bandMercenaries, canAffordWages, checkedMercenaries, receipt, setCheckedMercenaries, totalAmount, wagesDone, wagesDue};
};