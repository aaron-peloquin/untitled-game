import {useCallback} from 'react';

import {useGameData} from '../gameController/useGameData';

export const useSetSelectedQuestId = (questId: number) => {
  const gameData = useGameData();
  const {selectedQuestId, setSelectedQuestId} = gameData;

  const setSelected = useCallback(() => {
    setSelectedQuestId(questId);
  }, [questId, setSelectedQuestId]);

  return {
    isSelected: questId === selectedQuestId,
    setSelected,
  };
};
