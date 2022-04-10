import {IS_SSR} from '@static';
import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

export const useGetBand = () => {
  const gameData = useGameData();
  const band = useLiveQuery(() => IS_SSR ? undefined : gameData.dataStore?.band.where('bandId').above(0).first(), [gameData]);
  return band;
};
