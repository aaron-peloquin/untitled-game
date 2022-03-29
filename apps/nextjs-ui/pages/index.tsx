import Link from 'next/link';
import {db, useCurrentSave, useSetCurrentSave} from '@helper';
import {useLiveQuery} from 'dexie-react-hooks';
import {IS_SSR} from '@static';

const Homepage = () => {
  const gameSaves = useLiveQuery(() => !IS_SSR && db.gameSaves.toArray()) || [];
  const currentSave = useCurrentSave();
  const setGameSave = useSetCurrentSave();

  return <>
    <h1>Welcome</h1>
    <ul>
      {currentSave && <li><Link href="/game">{`Continue (${currentSave.name})`}</Link></li>}
      <li><Link href="/new-game">New Game</Link></li>
      {gameSaves.map((save) => <li key={save.id}>
        Load <button onClick={(e) => {
          e.preventDefault();
          setGameSave(save.id);
        }}>{save.name}</button>
      </li>)}
      <li><Link href="/settings">Settings</Link></li>
    </ul>
  </>;
};

export default Homepage;
