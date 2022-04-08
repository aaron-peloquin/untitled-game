import {Card, GridArea, GridTemplate} from '@components-layout';
import {useCurrentSave, useHireMercenary, useRevealMercenaryStats} from '@helper';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  canHire?: boolean
  mercenary: T_Mercenary
}

const MercenaryItem: React.FC<Props> = ({canHire, mercenary}) => {
  const save = useCurrentSave();
  const mercCost = mercenary.stats.cost || 1;
  const bandGold = save?.band?.gold || 0;
  const canBandHire = bandGold >= mercCost;

  const revealStatsCostUnsafe = mercCost - 5;
  const revealStatsCost = revealStatsCostUnsafe < 0 ? 0 : revealStatsCostUnsafe;
  const canRevealStats = bandGold >= revealStatsCost;

  const hireMercenary = useHireMercenary({canHire: !!canHire, mercenary, save});
  const revealStats = useRevealMercenaryStats({mercenary, revealStatsCost, save});

  return <Card layer='4' heading={`${mercenary.name}`}>
    A level {Math.round(mercenary.level)} {mercenary.ethnicity} {mercenary.profession}
    {mercenary.statsVisible && <dl>
      <dt>Health:</dt>
      <dd>{mercenary.health.toFixed(0)} ({mercenary.stats.endurance} endurance)</dd>

      <dt>Attack:</dt>
      <dd>{mercenary.stats.attack}% to hit</dd>
      <dd>{mercenary.stats.capture}% to capture</dd>

      <dt>Stealth:</dt>
      <dd>{mercenary.stats.stealth}%</dd>
    </dl>}
    <GridTemplate columns={2} justifyItems="center">
      {(canHire && !mercenary.statsVisible) && <GridArea><button disabled={!canRevealStats} onClick={revealStats}>Spar for {revealStatsCost ? `${revealStatsCost} gold` : 'free'}</button></GridArea>}
      {canHire && <GridArea><button disabled={!canBandHire} onClick={hireMercenary}>Hire for {mercenary.stats.cost} gold</button></GridArea>}
    </GridTemplate>
  </Card>;
};

export default memo(MercenaryItem);
