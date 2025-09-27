import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {useGetBand, useGetGameMetrics, useGameData} from '@datastore';
import {URLs} from '@static';
import Link from 'next/link';
import {memo, useMemo} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';

import {GameOverStats} from '../molecules/GameOverStats';
import {TopNav} from '../organisms/TopNav';

const gridTemplateAreas = `
"content"`;

const GameOverLayout = memo(() => {
  const band = useGetBand();
  const metrics = useGetGameMetrics();
  const gameData = useGameData();

  // Calculate total quests completed dynamically
  const totalQuestsCompleted = useLiveQuery(
    async () => {
      if (!gameData?.dataStore) return 0;
      // Calculate dynamically from completed quests
      const completedQuests = await gameData.dataStore.quests.where('questCompletedByMercenaryId').above(0).count();
      return completedQuests || 0;
    },
    [gameData?.dataStore],
  ) || 0;

  const finalScore = useMemo(() => {
    if (!band) return 'Unknown';
    return `Level ${band.level}`;
  }, [band]);

  if (!band || !metrics) {
    return (
      <>
        <TopNav />
        <Card heading="Game Over" layer="1">
          <p>Loading...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <GridTemplate gridTemplateAreas={gridTemplateAreas}>
        <GridArea name="content">
          <Card heading="Game Over" layer="1">
            <Card heading={`Final Score: ${finalScore}`} layer="2">
              <p><strong>{band.name}'s Mercenary Band</strong> has reached its end.</p>
            </Card>
            
            <Card heading="Session Statistics" layer="2">
              <GameOverStats 
                metrics={metrics} 
                totalQuestsCompleted={totalQuestsCompleted}
              />
            </Card>

            <Card heading="What's Next?" layer="2">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={URLs.newGame} passHref>
                  <Button as="a">Start New Game</Button>
                </Link>
                <Link href={URLs.mainMenu} passHref>
                  <Button as="a">Main Menu</Button>
                </Link>
              </div>
            </Card>
          </Card>
        </GridArea>
      </GridTemplate>
    </>
  );
});

GameOverLayout.displayName = 'GameOverLayout';
export { GameOverLayout };