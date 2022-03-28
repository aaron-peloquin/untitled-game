import {gameDataContext} from '@helper';
import {useCallback, useContext} from 'react';

const GameSettings = () => {
  const {seed, setSeed} = useContext(gameDataContext);
  const handleChange = useCallback((event) => {
    setSeed(event.target.value);
  }, [setSeed]);
  return (
    <fieldset>
      <legend>Game Settings</legend>
      <label htmlFor="currentSeed">Randomization Seed: </label>
      <input id="currentSeed" value={seed} onChange={handleChange} />
    </fieldset>

  );
};

export default GameSettings;
