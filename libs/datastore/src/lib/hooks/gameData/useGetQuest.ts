import {useLiveQuery} from 'dexie-react-hooks';

import {useGameData} from '../gameController/useGameData';

export const useGetQuest = (questId?: number) => {
  const gameData = useGameData();
  const quest = useLiveQuery(() => !questId ? undefined : gameData.dataStore?.quests.get(questId), [gameData, questId]);
  return quest;
};
