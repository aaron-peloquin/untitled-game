import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {Dispatch, memo, SetStateAction} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import MercenaryList from '../molecules/MercenaryList';

type T_Props = {
  bandGold: number
  bandMercenaries: T_Mercenary[]
  canAffordWages?: boolean
  checkedMercenaries: number[]
  setCheckedMercenaries: Dispatch<SetStateAction<number[]>>
  wagesDone: () => void
  receipt: {name: string, wage: number}[]
  totalAmount: number
}
const BandWages: React.FC<T_Props> = memo(({bandGold, bandMercenaries, canAffordWages, checkedMercenaries, receipt, totalAmount, setCheckedMercenaries, wagesDone}) => {
  return <Card layer="2" heading="Wages are due">
    <GridTemplate>
      <GridArea>
        <Card layer="3" heading="Pay Mercenaries">
          <p>You currently have <strong>{bandGold.toLocaleString('en-US')} gold</strong> in your coffers</p>
          {bandMercenaries ? <MercenaryList mercenaries={bandMercenaries} checkedMercenaries={checkedMercenaries} setCheckedMercenaries={setCheckedMercenaries} checkboxLabel="Pay Wages" /> : 'Your band has no mercenaries to keep'}
        </Card>
      </GridArea>
      <GridArea>
        <Card layer="3" heading={`Amount Due: ${totalAmount} Gold`}>
          <GridTemplate>
            <GridArea>
              <Card layer="4">
                <GridTemplate gridTemplateColumns="1fr 4fr">
                  <GridArea><strong>Name</strong></GridArea>
                  <GridArea><strong>Gold</strong></GridArea>
                  {receipt.map(({name, wage}) => <>
                    <GridArea>{name}</GridArea>
                    <GridArea>{wage} gold</GridArea>
                  </>)}
                  <GridArea><strong>Total Due</strong></GridArea>
                  <GridArea><strong>{totalAmount} gold</strong></GridArea>
                  <GridArea>Remaining Gold</GridArea>
                  <GridArea>{(bandGold - totalAmount).toLocaleString('en-US')} gold</GridArea>
                </GridTemplate>
              </Card>
            </GridArea>
            <GridArea><Button text={`Pay ${totalAmount} gold`} disabled={!canAffordWages} onClick={wagesDone} /></GridArea>
          </GridTemplate>
        </Card>
      </GridArea>
    </GridTemplate>
  </Card>;
});

BandWages.displayName = 'BandWages';
export {BandWages};
