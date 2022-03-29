import {SyntheticEvent, useCallback, useState} from 'react';
import {db, useSetCurrentSave} from '@helper';

const NewGame = () => {
  const [name, setName] = useState<string>('New game name');
  const [seed, setSeed] = useState<string>('Game Seed');
  const handleSeedChange = useCallback((e) => {
    setSeed(e.target.value);
  }, []);
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const setCurrentSave = useSetCurrentSave();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    db.gameSaves.add({
      band: {
        gold: 15,
        mercenaries: [],
        name,
      },
      currentLocation: null,
      currentSave: 0,
      name,
      pastLocations: [],
      seed,
    }).then((id) => setCurrentSave(id));
  };

  return <form onSubmit={handleSubmit}>
    <fieldset>
      <label htmlFor="name">Save Name</label>
      <input name="name" id="name" value={name} onChange={handleNameChange} />
      <label htmlFor="seed">Seed</label>
      <input name="seed" id="seed" value={seed} onChange={handleSeedChange} />
    </fieldset>
    <fieldset>
      <button type="submit">Start</button>
    </fieldset>
  </form>;
};

export default NewGame;
