import _ from 'lodash';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';
import MercenaryItem from '../atoms/MercenaryItem';

type Props = {
  mercenaries: T_Mercenary[]
}
const MercenaryList: React.FC<Props> = ({mercenaries}) => {
  return <ul>
    {mercenaries.map((mercenary) => <MercenaryItem mercenary={mercenary} />)}
  </ul>;
};

export default memo(MercenaryList);
