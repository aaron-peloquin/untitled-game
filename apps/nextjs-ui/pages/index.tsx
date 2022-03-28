import {useCallback, useEffect, useMemo, useState} from 'react';

import {gameDataContext, seedGenerator} from '@helper';
import {I_Location} from 'TS_Location';
import {T_GameData} from 'TS_General';
import {useBand} from '@band';
import {GameLayout} from '@components-game';
import {generateQuest} from '@quest';
import {generateMercenary} from '@mercenary';
import {generateLocation} from '@location';
const GameProvider = gameDataContext.Provider;

// const QUEST_RESULT_LOADING:T_QuestResult = {
//   outcome: 'Thinking...',
//   rewards: null,
//   roundsLog: null,
// };

const Homepage = () => {
  const [seed, setSeed] = useState<string>('randomization seed');
  const [pastLocations, setPastLocations] = useState<I_Location[]>();

  const bandController = useBand()
  const seededMercenaryGenerator = useMemo(() => generateMercenary(seedGenerator(seed)), [seed]);
  const seededQuestGenerator = useMemo(() => generateQuest(seedGenerator(seed)), [seed]);
  const seededLocationGenerator = useMemo(() => {
    console.log('new location generator')
    return generateLocation(seedGenerator(seed), seededMercenaryGenerator, seededQuestGenerator)
  }, [seed, seededMercenaryGenerator, seededQuestGenerator]);

  const [currentLocation, setLocation] = useState<I_Location>(seededLocationGenerator(1, 3));
  useEffect(() => {
    const location = seededLocationGenerator(1, 3)
    setLocation(location)
  }, [seededLocationGenerator])

  const setCurrentLocation = useCallback((newLocation) => {
    const currentLocationPastIndex = pastLocations.findIndex((loc) => loc === currentLocation);
    if (currentLocationPastIndex === -1) {
      const previousLocations = [
        ...pastLocations,
        currentLocation,
      ];
      setPastLocations(previousLocations);
    }
    setLocation(newLocation);
  }, [currentLocation, pastLocations]);

  const gameData = useMemo<T_GameData>(() => ({
    bandController,
    currentLocation,
    pastLocations,
    seed,
    seededLocationGenerator,
    setCurrentLocation,
    setSeed,
  }), [bandController, currentLocation, pastLocations, seed, seededLocationGenerator, setCurrentLocation]);


  return <GameProvider value={gameData}>
    <GameLayout />
  </GameProvider>;
};

export default Homepage;
