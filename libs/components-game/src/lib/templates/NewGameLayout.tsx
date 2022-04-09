import {Card, GridArea, GridTemplate} from '@components-layout';
import {useAddGameSave} from '@datastore';
import {pickArray} from '@helper';
import chance from 'chance';
import {SyntheticEvent, useCallback, useState} from 'react';


const generate = chance();

const VERBS = [
  'meeting a',
  'dancing with a',
  'staring at the',
  'is mocking my',
];

const gridTemplateAreas = `
"name-label name-field"
"seed-label seed-field"`;

export const NewGameLayout = () => {
  const [name, setName] = useState<string>(`${generate.first()} ${generate.last()}`);
  const [seed, setSeed] = useState<string>(`The ${generate.profession()} ${pickArray(VERBS)} ${generate.animal()}`);
  const handleSeedChange = useCallback((e) => {
    setSeed(e.target.value);
  }, []);
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const addGameSave = useAddGameSave();

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    addGameSave(name, seed);
  }, [addGameSave, name, seed]);

  return <form onSubmit={handleSubmit}>
    <Card layer='2' heading='New Game'>
      <Card layer='3' heading="Game Settings">
        <GridTemplate gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="1fr 4fr">
          <GridArea gridArea='name-label'>
            <label htmlFor="name">Mercenary Band Leader:</label>
          </GridArea>
          <GridArea gridArea='name-field'>
            <input required name="name" id="name" value={name} onChange={handleNameChange} />
          </GridArea>
          <GridArea gridArea='seed-label'>
            <label htmlFor='seed'>Game Seed:</label>
          </GridArea>
          <GridArea gridArea='seed-field'>
            <input required name="seed" id="seed" value={seed} onChange={handleSeedChange} />
          </GridArea>
        </GridTemplate>
        <button type="submit">Create Game</button>
      </Card>
    </Card>
  </form>;
};
