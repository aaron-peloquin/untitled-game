import { gameDataContext } from '@helper';
import {memo, useCallback, useContext, useMemo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';

type Props = {
  mercenary: T_Mercenary
}
const MercenaryItem: React.FC<Props> = ({mercenary}) => {
  const {bandController} = useContext(gameDataContext)
  const currentlyEnlisted = useMemo(() => {
    return bandController?.data.mercenaries.some(({mercenaryId}) => mercenaryId === mercenary.mercenaryId)
  }, [bandController?.data.mercenaries, mercenary])

  const toggleEnlisted = useCallback(() => {
    console.log({currentlyEnlisted})
    if(currentlyEnlisted) {
      bandController?.removeMercenary(mercenary)
    } else {
      bandController?.addMercenary(mercenary)
    }
  }, [mercenary, currentlyEnlisted])

  return <li>
    <div>
      <button onClick={toggleEnlisted}>{currentlyEnlisted ? 'Fire': 'Hire'}</button> <strong>{mercenary.name}</strong> level {Math.round(mercenary.level)} {mercenary.ethnicity} {mercenary.profession}
    </div>
  </li>;
};

export default memo(MercenaryItem);
