import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {useGetBand, useListMercenariesById} from '@datastore';
import {memo, useCallback, useState} from 'react';

import MercenaryList from '../molecules/MercenaryList';

type T_Props = {
  wagesDone: () => void
}
const BandWages: React.FC<T_Props> = memo(({wagesDone}) => {
  const band = useGetBand();
  const [checkedMercenaries, setCheckedMercenaries] = useState<number[]>([]);
  const bandMercenaries = useListMercenariesById(band?.mercenaryIds);

  return <Card layer="2" heading="Wages are due">
    <GridTemplate>
      <GridArea>
        <Card layer="3" heading="Pay Mercenaries">
          {bandMercenaries ? <MercenaryList mercenaries={bandMercenaries} checkedMercenaries={checkedMercenaries} setCheckedMercenaries={setCheckedMercenaries} /> : 'Your band has no mercenaries to keep'}
        </Card>
      </GridArea>
      <GridArea><Button text="Done" onClick={wagesDone} /></GridArea>
    </GridTemplate>
  </Card>;
});

BandWages.displayName = 'BandWages';
export {BandWages};
