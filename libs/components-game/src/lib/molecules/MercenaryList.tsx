import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import {MercenaryItem} from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  canSelect?: boolean
  mercenaries: T_Mercenary[]
  columns?: number
}
const MercenaryList: React.FC<Props> = ({canHire, canSelect, mercenaries, columns = 3}) => {
  return <GridTemplate columns={columns}>
    {mercenaries.map((mercenary) => <GridArea key={mercenary.mercenaryId}>
      <MercenaryItem canHire={canHire} canSelect={canSelect} mercenary={mercenary} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(MercenaryList);
