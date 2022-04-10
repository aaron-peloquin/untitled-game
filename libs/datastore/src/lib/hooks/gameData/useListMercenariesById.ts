import {useLiveQuery} from 'dexie-react-hooks';
import {useMemo} from 'react';

import {useGetBand} from './useGetBand';

import {useGameData} from '../gameController/useGameData';

const emptyArray: number[] = [];

export const useListMercenariesById = (mercenaryIds?: number[], hideRecruited?: boolean) => {
  const band = useGetBand();
  const gameData = useGameData();
  const searchIds = useMemo(() => {
    if (!hideRecruited) {
      return mercenaryIds || emptyArray;
    }
    const bandMercenaryIds = band?.mercenaryIds || emptyArray;
    return mercenaryIds?.filter((mercenaryId)=> bandMercenaryIds.indexOf(mercenaryId) === -1) || emptyArray;
  }, [band?.mercenaryIds, hideRecruited, mercenaryIds]);
  console.log({searchIds});
  const mercenaries = useLiveQuery(() => gameData.dataStore?.mercenaries.where('mercenaryId').anyOf(searchIds).toArray() || [], [gameData, searchIds]);
  return mercenaries;
};
