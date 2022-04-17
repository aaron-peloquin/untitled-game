import {Card, GridArea, GridTemplate} from '@components-layout';
import {useGetCurrentSave, useListGameSaves} from '@datastore';
import {URLs} from '@static';
import Link from 'next/link';
import {memo} from 'react';

import {ManageGame} from '../atoms/ManageGame';

const MAIN_MENU_LAYOUT = `
". menu_items ."`;

const MainMenuLayout = memo(() => {
  const gameSaves = useListGameSaves();
  const currentSave = useGetCurrentSave();

  return <Card layer="1" heading="An Untitled Game">
    <GridTemplate gridTemplateColumns="1fr 3fr 1fr" gridTemplateAreas={MAIN_MENU_LAYOUT} justifyItems="left" gridGap="8px">
      <GridArea name="menu_items" style={{width: '100%'}}>
        <Card layer='2' heading='Main Menu' style={{width: '100%'}}>
          {currentSave && <GridArea><Link href={URLs.playGame}>{`Continue (${currentSave.name})`}</Link></GridArea>}
          <GridArea><Link href={URLs.newGame}>New Game</Link></GridArea>
          <GridArea><Link href={URLs.settings}>Settings</Link></GridArea>
        </Card>
        <Card heading='Load Game' layer='2' style={{width: '100%'}}>
          {gameSaves?.map((save) => <GridArea key={save.gameSaveId}><ManageGame save={save} /></GridArea>)}
        </Card>
      </GridArea>
    </GridTemplate>
  </Card>;
});

MainMenuLayout.displayName = 'MainMenuLayout';
export {MainMenuLayout};
