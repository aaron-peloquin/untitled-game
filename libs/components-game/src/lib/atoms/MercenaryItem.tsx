import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {useHireMercenary, useSparMercenary} from '@datastore';
import {getStats} from '@helper';
import {memo, useMemo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  canHire?: boolean
  mercenary: T_Mercenary
}

const MercenaryItem: React.FC<Props> = memo(({canHire, mercenary}) => {
  const {canAffordHire, hire, hireCost} = useHireMercenary(mercenary);
  const {canAffordSpar, spar, sparCost} = useSparMercenary(mercenary);
  const stats = useMemo(() => {
    const mercStats = getStats(mercenary.level, mercenary.ethnicity, mercenary.profession, mercenary.personality);
    console.log('<MercenaryItem> stats:', mercStats);
    return mercStats;
  }, [mercenary.ethnicity, mercenary.level, mercenary.personality, mercenary.profession]);

  const showStatsButton = (canHire && !mercenary.statsVisible);

  return <Card layer='4' heading={`${mercenary.name}`}>
    A level {mercenary.level} {mercenary.ethnicity} {mercenary.profession}
    {mercenary.statsVisible && <Card layer="5" heading="Statistics">
      <GridTemplate gridTemplateRows="1fr 1fr" gridTemplateColumns="1fr 1fr" textAlign='center'>
        <GridArea>attack<br />{stats.attack}</GridArea>
        <GridArea>cunning<br />{stats.cunning}</GridArea>
        <GridArea>endurance<br />{stats.endurance}</GridArea>
        <GridArea>subtlety<br />{stats.subtlety}</GridArea>
      </GridTemplate>
    </Card>}
    <GridTemplate columns={2} justifyItems="center">
      {showStatsButton && <GridArea><Button disabled={!canAffordSpar} onClick={spar} text={`Spar for ${sparCost ? `${sparCost} gold` : 'free'}`} /></GridArea>}
      {!showStatsButton && <GridArea>{stats._goldUpkeep} gold wages</GridArea>}
      {canHire && <GridArea><Button disabled={!canAffordHire} onClick={hire} text={`Hire for ${hireCost} gold`} /></GridArea>}
    </GridTemplate>
  </Card>;
});
MercenaryItem.displayName = 'MercenaryItem';
export {MercenaryItem};
