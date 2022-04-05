import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import MercenaryItem from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  mercenaries: T_Mercenary[]
  columns?: number
}
const MercenaryList: React.FC<Props> = ({canHire, mercenaries, columns = 4}) => {
  return <GridTemplate columns={columns}>
    {mercenaries.map((mercenary) => <GridArea key={mercenary.id}>
      <MercenaryItem canHire={canHire} mercenary={mercenary} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(MercenaryList);
