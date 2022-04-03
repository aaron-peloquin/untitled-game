import {db, useSetCurrentSave} from '@helper';
import {SyntheticEvent, useCallback, useState} from 'react';
import {T_GameSave} from 'TS_General';

export const NewGameLayout = () => {
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
    const newSave:T_GameSave = {
      band: {
        gold: 15,
        mercenaries: [],
        name,
      },
      currentLocation: 0,
      currentSave: 0,
      name,
      pastLocations: [],
      seed,
    };
    db.gameSaves.add(newSave).then((id) => setCurrentSave(id));
  };

  return <form onSubmit={handleSubmit}>
    <h1>New game</h1>
    <fieldset>
      <label htmlFor="name">Save Name</label>
      <input required name="name" id="name" value={name} onChange={handleNameChange} />
      <label htmlFor="seed">Seed</label>
      <input required name="seed" id="seed" value={seed} onChange={handleSeedChange} />
    </fieldset>
    <fieldset>
      <button type="submit">Start</button>
    </fieldset>
  </form>;
};
