import Link from 'next/link';
import {db, useCurrentSave, useGameSaves, useSetCurrentSave} from '@helper';
import {useLiveQuery} from 'dexie-react-hooks';
import {IS_SSR, URLs} from '@static';
import {SyntheticEvent} from 'react';

export const MainMenuLayout = () => {
  const gameSaves = useGameSaves();
  const currentSave = useCurrentSave();
  const setGameSave = useSetCurrentSave();

  return <>
    <h1>Welcome</h1>
    <ul>
      {currentSave && <li><Link href={URLs.playGame}>{`Continue (${currentSave.name})`}</Link></li>}
      <li><Link href={URLs.newGame}>New Game</Link></li>
      {gameSaves.map((save) => <li key={save.id}>
          Load <button onClick={(e: SyntheticEvent) => {
          e.preventDefault();
          setGameSave(save.id);
        }}>{save.name}</button>
      </li>)}
      <li><Link href={URLs.settings}>Settings</Link></li>
    </ul>
  </>;
};
