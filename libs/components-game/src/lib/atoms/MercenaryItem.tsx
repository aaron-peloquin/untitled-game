import {Button, Card, GridArea, GridTemplate, Label, Output, ProgressBar} from '@components-layout';
import {useGetStats, useHireMercenary, useSparMercenary} from '@datastore';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  canHire?: boolean
  mercenary: T_Mercenary
}

const STATS_AREA = `
"health___ health___"
"attack___ cunning__"
"endurance subtlety_"`;

const MercenaryItem: React.FC<Props> = memo(({canHire, mercenary}) => {
  const {currentHealth, level, mercenaryId, name, statsVisible} = mercenary;
  const stats = useGetStats(mercenary);

  const {canAffordHire, hire, hireCost} = useHireMercenary(mercenary, stats._goldHiring);
  const {canAffordSpar, spar, sparCost} = useSparMercenary(mercenary);
  const showStatsButton = (canHire && !statsVisible);

  return <Card layer='4'>
    <GridTemplate gridTemplateColumns="3fr 1fr">
      <GridArea>
        <Output label={`${stats.ethnicity} ${stats.profession}`} value={`${name}, lvl: ${level}`} id={`${mercenaryId}_heading`} />
      </GridArea>
      <GridArea justifySelf="right">
        {!showStatsButton && <GridArea><Output label="Wages" id={`${mercenaryId}_wages`} value={`${stats._goldUpkeep} gold`} /></GridArea>}
      </GridArea>
    </GridTemplate>

    {statsVisible && <Card layer="5">
      <GridTemplate gridTemplateAreas={STATS_AREA} gridTemplateColumns="1fr 1fr" textAlign='center'>
        <GridArea name="health___">
          <ProgressBar max={stats.maxHealth} color="red" value={currentHealth} id={`${mercenaryId}_health`} />
        </GridArea>
        <GridArea name="attack___"><Output label="Attack" id={`${mercenaryId}_attack`} value={stats.attack} /></GridArea>
        <GridArea name="cunning__"><Output label="Cunning" id={`${mercenaryId}_cunning`} value={stats.cunning} /></GridArea>
        <GridArea name="endurance"><Output label="Endurance" id={`${mercenaryId}_endurance`} value={stats.endurance} /></GridArea>
        <GridArea name="subtlety_"><Output label="Subtlety" id={`${mercenaryId}_subtlety`} value={stats.subtlety} /></GridArea>
      </GridTemplate>
    </Card>}
    <GridTemplate columns={2} justifyItems="center">
      {showStatsButton && <GridArea><Button disabled={!canAffordSpar} onClick={spar} text={`Spar for ${sparCost ? `${sparCost} gold` : 'free'}`} /></GridArea>}
      {canHire && <GridArea><Button disabled={!canAffordHire} onClick={hire} text={`Hire for ${hireCost} gold`} /></GridArea>}
    </GridTemplate>
  </Card>;
});
MercenaryItem.displayName = 'MercenaryItem';
export {MercenaryItem};
