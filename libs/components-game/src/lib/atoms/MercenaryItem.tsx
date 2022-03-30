import {useCurrentSave, useHireMercenary} from '@helper';
import {memo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  canHire?: boolean
  mercenary: T_Mercenary
  fullStats?: boolean
}

const MercenaryItem: React.FC<Props> = ({canHire, fullStats, mercenary}) => {
  const save = useCurrentSave();
  const bandCanHire = (save?.band?.gold || 0) >= (mercenary.stats.cost || 1);

  const hireMercenary = useHireMercenary({canHire: !!canHire, mercenary, save});
  return <li>
    <div>
      {canHire && <button disabled={!bandCanHire} onClick={hireMercenary}>Hire for {mercenary.stats.cost} gold</button>}
      {` `}
      <strong>{mercenary.name}</strong> level {Math.round(mercenary.level)} {mercenary.ethnicity} {mercenary.profession}
      {fullStats && <dl>
        <dt>Health</dt>
        <dd>{mercenary.health.toFixed(0)} ({mercenary.stats.endurance} endurance)</dd>

        <dt>Attack</dt>
        <dd>{mercenary.stats.attack}% to hit, {mercenary.stats.capture}% to capture</dd>

        <dt>Stealth</dt>
        <dd>{mercenary.stats.stealth}%</dd>
      </dl>}
    </div>
  </li>;
};

export default memo(MercenaryItem);
