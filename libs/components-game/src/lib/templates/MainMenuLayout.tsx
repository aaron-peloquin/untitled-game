import {Card, GridArea, GridTemplate} from '@components-layout';
import {useGetCurrentSave, useListGameSaves} from '@datastore';
import {URLs} from '@static';
import Link from 'next/link';
import {memo} from 'react';

import {ManageGame} from '../atoms/ManageGame';
import {SteamHeader} from '../molecules/SteamHeader';

const MAIN_MENU_LAYOUT = `
". menu_items ."`;

const MainMenuLayout = memo(() => {
  const gameSaves = useListGameSaves();
  const currentSave = useGetCurrentSave();

  return <>
    <SteamHeader />
    <Card layer="1" heading="An Untitled Game">
      <GridTemplate gridTemplateColumns="1fr 3fr 1fr" gridTemplateAreas={MAIN_MENU_LAYOUT} justifyItems="left" gridGap="8px">
        <GridArea name="menu_items" style={{width: '100%'}}>
          <Card layer='2' heading='Main Menu' style={{width: '100%'}}>
            {currentSave && <GridArea style={{fontSize: '1.25rem'}}>
              <Link href={URLs.playGame}>{`Continue (${currentSave.name})`}</Link>
            &nbsp;|&nbsp;
              <Link href={URLs.playVirtualGame}>Continue in VR</Link>
            </GridArea>}
            <GridArea style={{fontSize: '1.25rem'}}><Link href={URLs.newGame}>New Game</Link></GridArea>
            <GridArea style={{fontSize: '1.25rem'}}><Link href={URLs.settings}>Settings</Link></GridArea>
          </Card>
          <Card heading='Load Game' layer='2' style={{width: '100%'}}>
            {gameSaves?.map((save) => <GridArea style={{fontSize: '1.25rem'}} key={save.gameSaveId}><ManageGame save={save} /></GridArea>)}
          </Card>
        </GridArea>
      </GridTemplate>
    </Card>
  </>;
});

MainMenuLayout.displayName = 'MainMenuLayout';
export {MainMenuLayout};
