import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {useAddGameSave} from '@datastore';
import {pickArray, randomName} from '@helper';
import chance from 'chance';
import {SyntheticEvent, useCallback, useState} from 'react';

import {TopNav} from '../organisms/TopNav';

const VERBS = [
  'meeting a',
  'dancing with a',
  'staring at the',
  'is mocking my',
];

const gridTemplateAreas = `
"name-label name-field"
"seed-label seed-field"
"btn-submit btn-submit"`;

const randomSeed = (generate = chance()) => `The ${generate.profession()} ${pickArray(VERBS)} ${generate.animal()}`;

export const NewGameLayout = () => {
  const [name, setName] = useState<string>(randomName);
  const [seed, setSeed] = useState<string>(randomSeed);
  const handleRandomName = useCallback(() => setName(randomName()), []);
  const handleRandomSeed = useCallback(() => setSeed(randomSeed()), []);
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleSeedChange = useCallback((e) => setSeed(e.target.value), []);

  const addGameSave = useAddGameSave();

  const handleSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    addGameSave(name, seed);
  }, [addGameSave, name, seed]);

  return <>
    <TopNav />
    <form onSubmit={handleSubmit}>
      <Card layer='2' heading='New Game'>
        <Card layer='3' heading="Game Settings">
          <GridTemplate gridTemplateAreas={gridTemplateAreas} gridTemplateColumns="1fr 2fr" gridGap="8px">
            <GridArea name='name-label'>
              <Button type="button" ariaLabel="Randomize Band Name" text="Random" onClick={handleRandomName} />
              <label htmlFor="name">Mercenary Band Leader:</label>
            </GridArea>
            <GridArea name='name-field'>
              <input required name="name" id="name" value={name} onChange={handleNameChange} />
            </GridArea>
            <GridArea name='seed-label'>
              <Button type="button" ariaLabel="Randomize Seed" text="Random" onClick={handleRandomSeed} />
              <label htmlFor='seed'>Game Seed:</label>
            </GridArea>
            <GridArea name='seed-field'>
              <input required name="seed" id="seed" value={seed} onChange={handleSeedChange} />
            </GridArea>
            <GridArea name='btn-submit' justifySelf="center">
              <Button text='Create Game' type="submit" />
            </GridArea>
          </GridTemplate>
        </Card>
      </Card>
    </form>
  </>;
};
