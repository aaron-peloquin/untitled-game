import {GridTemplate, GridArea, Label, ProgressBar, Button, Output} from '@components-layout';
import {useRest} from '@datastore';
import {T_Band} from 'TS_Band';

type T_Props = {
    band?: T_Band
}
const BandRest: React.FC<T_Props> = ({band}) => {
  const {currentAp, maxAp, restoreAp, restoreApAmount} = useRest(band);

  return <GridTemplate textAlign='center' columns={3} gridGap="8px">
    <GridArea>
      <Label htmlFor='band_action-points' text={`Action Poionts (${currentAp}/${maxAp} AP)`} />
      <ProgressBar color="skyblue" value={currentAp} max={maxAp} id="band_action-points" />
    </GridArea>
    <GridArea>
      <Output label="Wages due in" value={`${band?.daysUntilWages} days`} id="days-until-wages-due" />
    </GridArea>
    <GridArea>
      <Button onClick={restoreAp} text={`Rest (regain ${restoreApAmount > 0 ? restoreApAmount : 0} AP)`} />
    </GridArea>
  </GridTemplate>;
};

BandRest.displayName = 'BandRest';
export {BandRest};
