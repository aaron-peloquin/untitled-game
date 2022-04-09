import {useGetCurrentSave, useListGameSaves} from '@datastore';
import {URLs} from '@static';
import Link from 'next/link';

import {ManageGame} from '../atoms/ManageGame';

export const MainMenuLayout = () => {
  const gameSaves = useListGameSaves();
  const currentSave = useGetCurrentSave();

  return <>
    <h1>Welcome</h1>
    <ul>
      {currentSave && <li><Link href={URLs.playGame}>{`Continue (${currentSave.name})`}</Link></li>}
      <li><Link href={URLs.newGame}>New Game</Link></li>
      {gameSaves?.map((save) => <li key={save.id}><ManageGame save={save} /></li>)}
      <li><Link href={URLs.settings}>Settings</Link></li>
    </ul>
  </>;
};
