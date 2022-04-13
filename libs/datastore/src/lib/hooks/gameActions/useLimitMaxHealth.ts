import {useEffect} from 'react';

import {useGameData} from '../gameController/useGameData';

export const useLimitMaxHealth = (mercenaryId: number, maxHealth: number, currentHealth: number) => {
  const gameData = useGameData();
  useEffect(() => {
    if (maxHealth && currentHealth > maxHealth) {
      gameData.dataStore?.mercenaries.update(mercenaryId, {currentHealth: maxHealth});
    }
  }, [currentHealth, gameData.dataStore?.mercenaries, mercenaryId, maxHealth]);
};


