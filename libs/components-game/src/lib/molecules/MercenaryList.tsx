import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

import MercenaryItem from '../atoms/MercenaryItem';

type Props = {
  canHire?: boolean
  fullStats?: boolean
  mercenaries: T_Mercenary[]
}
const MercenaryList: React.FC<Props> = ({canHire, mercenaries, fullStats}) => {
  return <ul>
    {mercenaries.map((mercenary) => <MercenaryItem canHire={canHire} fullStats={fullStats} mercenary={mercenary} />)}
  </ul>;
};

export default memo(MercenaryList);
