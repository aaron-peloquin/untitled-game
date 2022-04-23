import {GridArea, GridTemplate} from '@components-layout';
import {Dispatch, memo, SetStateAction} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {MercenaryItem} from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  canSelect?: boolean
  columns?: number
  mercenaries: T_Mercenary[]
  checkedMercenaries: number[]
  setCheckedMercenaries: Dispatch<SetStateAction<number[]>>
  showHealthBar?: boolean
}

const MercenaryList: React.FC<Props> = ({canHire, canSelect, columns = 3, mercenaries, checkedMercenaries, setCheckedMercenaries, showHealthBar}) => {
  return <GridTemplate columns={columns}>
    {mercenaries.map((mercenary) => {
      const isChecked = checkedMercenaries.some((mercenaryId)=>{
        console.log('comparezz', mercenaryId === mercenary.mercenaryId);
        return mercenaryId === mercenary.mercenaryId;
      });
      return <GridArea key={mercenary.mercenaryId}>
        <MercenaryItem
          canHire={canHire}
          canSelect={canSelect}
          mercenary={mercenary}
          isChecked={isChecked}
          setCheckedMercenaries={setCheckedMercenaries}
          showHealthBar={showHealthBar}
        />
      </GridArea>;
    })}
  </GridTemplate>;
};

export default memo(MercenaryList);
