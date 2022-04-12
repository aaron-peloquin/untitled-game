import {Card, GridArea, GridTemplate} from '@components-layout';
import {useHireMercenary, useSparMercenary} from '@datastore';
import {getStats} from '@helper';
import {memo, useMemo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  canHire?: boolean
  mercenary: T_Mercenary
}

const MercenaryItem: React.FC<Props> = ({canHire, mercenary}) => {
  const {canAffordHire, hire, hireCost} = useHireMercenary(mercenary);
  const {canAffordSpar, spar, sparCost} = useSparMercenary(mercenary);
  const stats = useMemo(() => {
    const mercStats = getStats(mercenary.level, mercenary.ethnicity, mercenary.profession, mercenary.personality);
    console.log('<MercenaryItem> stats:', mercStats);
    return mercStats;
  }, [mercenary.ethnicity, mercenary.level, mercenary.personality, mercenary.profession]);


  return <Card layer='4' heading={`${mercenary.name}`}>
    A level {Math.round(mercenary.level)} {mercenary.ethnicity} {mercenary.profession}
    {mercenary.statsVisible && <p>stats: {stats.subtlety}</p>}
    <GridTemplate columns={2} justifyItems="center">
      {(canHire && !mercenary.statsVisible) && <GridArea><button disabled={!canAffordSpar} onClick={spar}>Spar for {sparCost ? `${sparCost} gold` : 'free'}</button></GridArea>}
      {canHire && <GridArea><button disabled={!canAffordHire} onClick={hire}>Hire for {hireCost} gold</button></GridArea>}
    </GridTemplate>
  </Card>;
};

export default memo(MercenaryItem);
