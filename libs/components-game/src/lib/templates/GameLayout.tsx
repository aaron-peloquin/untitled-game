import {GridArea, GridTemplate} from '@components-layout';
import {useGetBand, usePayWages, useGameOverCheck} from '@datastore';
import {URLs} from '@static';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';

import {Location} from './../organisms/Location';

import {BandPanel} from '../organisms/BandPanel';
import {BandWages} from '../organisms/BandWages';
import {TopNav} from '../organisms/TopNav';

const gridTemplateAreas = `
"band____"
"location"`;

const GameLayout = memo(() => {
  const band = useGetBand();
  const {wagesDue, bandMercenaries, ...wagesProps} = usePayWages(band);
  const gameOverCheck = useGameOverCheck();
  const router = useRouter();

  // Check for game over condition and redirect
  useEffect(() => {
    if (gameOverCheck.isGameOver && !wagesDue) {
      console.log('Game Over detected:', gameOverCheck.reason);
      router.push(URLs.gameOver);
    }
  }, [gameOverCheck.isGameOver, gameOverCheck.reason, router, wagesDue]);

  return <>
    <TopNav />
    {bandMercenaries && wagesDue ?
    <BandWages bandGold={band?.gold || 0} bandMercenaries={bandMercenaries} {...wagesProps} /> :
    <GridTemplate gridTemplateAreas={gridTemplateAreas}>
      <GridArea name='band____'>
        <BandPanel />
      </GridArea>
      <GridArea name='location'>
        {band?.currentLocationId && <Location locationId={band.currentLocationId} />}
      </GridArea>
    </GridTemplate>}
  </>;
});

GameLayout.displayName = 'GameLayout';
export {GameLayout};
