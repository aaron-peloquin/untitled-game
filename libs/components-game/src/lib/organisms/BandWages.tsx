import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {Dispatch, memo, SetStateAction} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import MercenaryList from '../molecules/MercenaryList';

type T_Props = {
  bandMercenaries: T_Mercenary[]
  canAffordWages?: boolean
  checkedMercenaries: number[]
  setCheckedMercenaries: Dispatch<SetStateAction<number[]>>
  wagesDone: () => void
  receipt: {name: string, wage: number}[]
  totalAmount: number
}
const BandWages: React.FC<T_Props> = memo(({bandMercenaries, canAffordWages, checkedMercenaries, receipt, totalAmount, setCheckedMercenaries, wagesDone}) => {
  return <Card layer="2" heading="Wages are due">
    <GridTemplate>
      <GridArea>
        <Card layer="3" heading="Pay Mercenaries">
          {bandMercenaries ? <MercenaryList mercenaries={bandMercenaries} checkedMercenaries={checkedMercenaries} setCheckedMercenaries={setCheckedMercenaries} checkboxLabel="Pay Wages" /> : 'Your band has no mercenaries to keep'}
        </Card>
      </GridArea>
      <GridArea>
        <Card layer="3" heading={`Amount Due: ${totalAmount} Gold`}>
          <table border="1" style={{minWidth: '20rem'}}>
            <caption>Keep these mercenaries around</caption>
            <tr>
              <th>Name</th>
              <th>Wages</th>
            </tr>
            {receipt.map(({name, wage}) => <tr>
              <td>{name}</td>
              <td>{wage} gold</td>
            </tr>)}
          </table>
        </Card>
      </GridArea>
      <GridArea><Button text="Pay Wages" disabled={!canAffordWages} onClick={wagesDone} /></GridArea>
    </GridTemplate>
  </Card>;
});

BandWages.displayName = 'BandWages';
export {BandWages};
