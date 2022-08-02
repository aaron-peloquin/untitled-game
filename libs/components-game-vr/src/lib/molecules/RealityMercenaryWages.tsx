import {Dispatch, MutableRefObject, SetStateAction, useCallback} from 'react';
import {Mesh} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityMercenary} from './RealityMercenary';

type T_Props = {
  mercenary: T_Mercenary
  offset: number
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  setCheckedMercenaries: Dispatch<SetStateAction<number[]>>
}

const RealityMercenaryWages: React.FC<T_Props> = ({
  mercenary,
  offset,
  refSelectMercenaryBox,
  setCheckedMercenaries,
}) => {
  const setMercenary = useCallback((distance) => {
    setCheckedMercenaries((checkedMercenaries) => {
      const uncheck = distance < .2;
      if (uncheck) {
        return checkedMercenaries.filter((mercenaryId) => mercenaryId !== mercenary.mercenaryId);
      } else {
        return [...checkedMercenaries, mercenary.mercenaryId];
      }
    });
  }, [mercenary.mercenaryId, setCheckedMercenaries]);

  return <RealityMercenary mercenary={mercenary} offset={offset} generalActionCallback={setMercenary} refGeneralActionBox={refSelectMercenaryBox} />;
};

RealityMercenaryWages.displayName = 'RealityMercenaryWages';
export {RealityMercenaryWages};
