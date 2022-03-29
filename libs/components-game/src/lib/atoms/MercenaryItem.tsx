import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  mercenary: T_Mercenary
}
const MercenaryItem: React.FC<Props> = ({mercenary}) => {
  return <li>
    <div>
      <button>{'Hire'}</button> <strong>{mercenary.name}</strong> level {Math.round(mercenary.level)} {mercenary.ethnicity} {mercenary.profession}
    </div>
  </li>;
};

export default memo(MercenaryItem);
