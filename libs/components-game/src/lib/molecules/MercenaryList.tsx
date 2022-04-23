import {GridArea, GridTemplate} from '@components-layout';
import {Dispatch, memo, SetStateAction} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {MercenaryItem} from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  canSelect?: boolean
  checkedMercenaries?: number[]
  checkboxLabel?: string
  columns?: number
  mercenaries: T_Mercenary[]
  setCheckedMercenaries?: Dispatch<SetStateAction<number[]>>
  showHealthBar?: boolean
}

const MercenaryList: React.FC<Props> = ({
  canHire,
  canSelect,
  columns = 3,
  mercenaries,
  checkboxLabel,
  checkedMercenaries,
  setCheckedMercenaries,
  showHealthBar,
}) => {
  return <GridTemplate columns={columns}>
    {mercenaries.map((mercenary) => {
      const isChecked = checkedMercenaries?.some((mercenaryId)=>{
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
          checkboxLabel={checkboxLabel}
        />
      </GridArea>;
    })}
  </GridTemplate>;
};

export default memo(MercenaryList);
