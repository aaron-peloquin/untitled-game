import {Card, GridArea, GridTemplate} from '@components-layout';
import {useGetCurrentSave, useListGameSaves} from '@datastore';
import {URLs} from '@static';
import Link from 'next/link';

import {ManageGame} from '../atoms/ManageGame';

export const MainMenuLayout = () => {
  const gameSaves = useListGameSaves();
  const currentSave = useGetCurrentSave();

  return <Card layer="1" heading="An Untitled Game">
    <GridTemplate gridTemplateColumns="1fr" justifyItems="left" gridGap="8px">
      {currentSave && <GridArea><Link href={URLs.playGame}>{`Continue (${currentSave.name})`}</Link></GridArea>}
      <GridArea><Link href={URLs.newGame}>New Game</Link></GridArea>
      {gameSaves?.map((save) => <GridArea key={save.gameSaveId}><ManageGame save={save} /></GridArea>)}
      <GridArea><Link href={URLs.settings}>Settings</Link></GridArea>
    </GridTemplate>
  </Card>;
};
