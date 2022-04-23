import {useState, useCallback, useEffect} from 'react';
import {T_Band} from 'TS_Band';

import {useGameData} from '../gameController/useGameData';

export const usePayWages = (band?: T_Band) => {
  const gameData = useGameData();
  const [wagesDue, setWagesDue] = useState(false);
  const bandDaysUntilWages = band?.daysUntilWages ?? 0;

  useEffect(() => {
    if (!wagesDue && bandDaysUntilWages === 0) {
      setWagesDue(true);
    } else if (bandDaysUntilWages > 0) {
      setWagesDue(false);
    }
  }, [bandDaysUntilWages, wagesDue]);

  const wagesDone = useCallback(() => {
    gameData.dataStore?.band.update(band?.bandId || 1, {daysUntilWages: 5});
    setWagesDue(false);
  }, [band?.bandId, gameData.dataStore?.band]);

  return {wagesDone, wagesDue};
};
