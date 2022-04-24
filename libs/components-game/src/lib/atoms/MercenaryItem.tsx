import {Button, Card, GridArea, GridTemplate, Output, ProgressBar, Toggle} from '@components-layout';
import {useHireMercenary, useSparMercenary, useSetSelectMercenaryId, useGetMercenaryStats} from '@datastore';
import {displayNumber} from '@helper';
import {Dispatch, memo, SetStateAction, useCallback, useMemo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type T_Props = {
  canHire?: boolean
  canSelect?: boolean
  mercenary: T_Mercenary
  showHealthBar?: boolean
  checkboxLabel?: string
  isChecked?: boolean
  setCheckedMercenaries?: Dispatch<SetStateAction<number[]>>
}

const STATS_AREA = `
"health___ health___"
"attack___ cunning__"
"endurance subtlety_"`;

const MercenaryItem: React.FC<T_Props> = memo(({
  canHire,
  canSelect,
  mercenary,
  isChecked = false,
  checkboxLabel = '',
  setCheckedMercenaries,
  showHealthBar,
}) => {
  const showCheckbox = !!setCheckedMercenaries;
  const toggleChecked = useCallback(() => {
    if (setCheckedMercenaries) {
      setCheckedMercenaries((checkedMercenaries) => {
        const isChecked = checkedMercenaries.some((mercenaryId) => mercenaryId === mercenary.mercenaryId);
        if (isChecked) {
          return checkedMercenaries.filter((mercenaryId) => mercenaryId !== mercenary.mercenaryId);
        } else {
          return [
            ...checkedMercenaries,
            mercenary.mercenaryId,
          ];
        }
      });
    }
  }, [mercenary.mercenaryId, setCheckedMercenaries]);

  const {currentHealth, level, mercenaryId, name, statsVisible} = mercenary;
  const stats = useGetMercenaryStats(mercenary);
  const {isSelected, setSelected} = useSetSelectMercenaryId(mercenaryId);

  const {canAffordHire, hire, hireCost, slotsAvailable} = useHireMercenary(mercenary, stats._goldHiring);
  const {canAffordSpar, spar, sparCost} = useSparMercenary(mercenary);
  const showStatsButton = (canHire && !statsVisible);
  const showSelectButton = canSelect && currentHealth > 0;
  const healthbarColor = useMemo(() => {
    if (currentHealth > stats.maxHealth / 2) {
      return 'seagreen';
    } else if (currentHealth > stats.maxHealth / 4) {
      return 'yellow';
    } else {
      return 'orange';
    }
  }, [currentHealth, stats.maxHealth]);

  return <Card layer='4'>
    <GridTemplate gridTemplateColumns="3fr 1fr">
      <GridArea>
        <Output label={`${stats.ethnicity} ${stats.profession} (${mercenary.personality})`} value={`${name}, lvl: ${displayNumber(level)}  (${displayNumber(level, 2)})`} id={`${mercenaryId}_heading`} />
      </GridArea>
      <GridArea justifySelf="right">
        {!showStatsButton && <GridArea><Output label="Wages" id={`${mercenaryId}_wages`} value={`${stats._goldUpkeep} gold`} /></GridArea>}
      </GridArea>
    </GridTemplate>

    {statsVisible && <Card layer="5">
      <GridTemplate gridTemplateAreas={STATS_AREA} gridTemplateColumns="1fr 1fr" textAlign='center'>
        {showHealthBar && <GridArea name="health___">
          <ProgressBar max={stats.maxHealth} color={healthbarColor} value={currentHealth} id={`${mercenaryId}_health`} />
        </GridArea>}
        <GridArea name="attack___"><Output label="Attack" id={`${mercenaryId}_attack`} value={stats.attack} /></GridArea>
        <GridArea name="cunning__"><Output label="Cunning" id={`${mercenaryId}_cunning`} value={stats.cunning} /></GridArea>
        <GridArea name="endurance"><Output label="Endurance" id={`${mercenaryId}_endurance`} value={stats.endurance} /></GridArea>
        <GridArea name="subtlety_"><Output label="Subtlety" id={`${mercenaryId}_subtlety`} value={stats.subtlety} /></GridArea>
      </GridTemplate>
    </Card>}
    <GridTemplate columns={showStatsButton && canHire ? 2 : 1} justifyItems="center">
      {showCheckbox && <GridArea><Toggle label={checkboxLabel} checked={isChecked} id={`check-mercenary-${mercenary.mercenaryId}`} onChange={toggleChecked} /></GridArea>}
      {showStatsButton && <GridArea><Button disabled={!canAffordSpar} onClick={spar} text={`Spar for ${sparCost ? `${sparCost} gold` : 'free'}`} /></GridArea>}
      {canHire && <GridArea><Button disabled={!canAffordHire || !slotsAvailable} onClick={hire} text={`Hire for ${hireCost} gold`} /></GridArea>}
      {showSelectButton && <GridArea><Button disabled={isSelected} text="Select Mercenary" onClick={setSelected} /></GridArea>}
    </GridTemplate>
  </Card>;
});
MercenaryItem.displayName = 'MercenaryItem';
export {MercenaryItem};
