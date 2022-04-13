import {useCallback} from 'react';

import {useGameData} from '../gameController/useGameData';

export const useSetSelectMercenaryId = (mercenaryId: number) => {
  const gameData = useGameData();
  const {selectedMercenaryId, setSelectedMercenaryId} = gameData;

  const setSelected = useCallback(() => {
    setSelectedMercenaryId(mercenaryId);
  }, [mercenaryId, setSelectedMercenaryId]);

  return {
    isSelected: mercenaryId === selectedMercenaryId,
    setSelected,
  };
};
