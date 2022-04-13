import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {MercenaryItem} from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  canSelect?: boolean
  columns?: number
  mercenaries: T_Mercenary[]
  showHealthBar?: boolean
}

const MercenaryList: React.FC<Props> = ({canHire, canSelect, columns = 3, mercenaries, showHealthBar}) => {
  return <GridTemplate columns={columns}>
    {mercenaries.map((mercenary) => <GridArea key={mercenary.mercenaryId}>
      <MercenaryItem canHire={canHire} canSelect={canSelect} mercenary={mercenary} showHealthBar={showHealthBar} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(MercenaryList);
