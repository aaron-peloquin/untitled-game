
import {useCallback} from 'react';

import {useGameData} from '../gameController/useGameData';

export const useSetInspectMercenaryId = (mercenaryId: number) => {
  const gameData = useGameData();
  const {inspectMercenaryId, setInspectMercenaryId} = gameData;

  const setInspect = useCallback((unset?: boolean) => {
    if (unset) {
      setInspectMercenaryId(undefined);
    } else {
      setInspectMercenaryId(mercenaryId);
    }
  }, [mercenaryId, setInspectMercenaryId]);

  return {
    isInspecting: mercenaryId === inspectMercenaryId,
    setInspect,
  };
};
