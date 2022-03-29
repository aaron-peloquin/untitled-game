import { gameDataContext } from '@helper';
import _ from 'lodash';
import {memo, useContext, useMemo} from 'react';
import {T_Mercenary} from 'TS_Mercenary';
import MercenaryItem from '../atoms/MercenaryItem';

type Props = {
  hideEnlisted?: boolean,
  mercenaries: T_Mercenary[]
}
const MercenaryList: React.FC<Props> = ({hideEnlisted, mercenaries}) => {
  const {bandController} = useContext(gameDataContext);
  const visibleMercenaries = useMemo(() => {
    if(hideEnlisted) {
      const enlistedMercenaries = bandController.data.mercenaries
      return _.differenceWith(mercenaries, enlistedMercenaries, (mercA, mercB) => mercA.mercenaryId===mercB.mercenaryId)
  }
  return mercenaries
  }, [mercenaries, bandController.data.mercenaries])

  return <ul>
    {visibleMercenaries.map((mercenary) => <MercenaryItem mercenary={mercenary} />)}
  </ul>;
};

export default memo(MercenaryList);
