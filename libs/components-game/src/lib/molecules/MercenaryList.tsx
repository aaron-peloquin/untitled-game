import {GridArea, GridTemplate} from '@components-layout';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import MercenaryItem from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  fullStats?: boolean
  mercenaries: T_Mercenary[]
}
const MercenaryList: React.FC<Props> = ({canHire, mercenaries, fullStats}) => {
  console.log({mercenaries});
  return <GridTemplate columns={2}>
    {mercenaries.map((mercenary) => <GridArea key={mercenary.id}>
      <MercenaryItem canHire={canHire} fullStats={fullStats} mercenary={mercenary} />
    </GridArea>)}
  </GridTemplate>;
};

export default memo(MercenaryList);
