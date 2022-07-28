import {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {Mesh} from 'three';
import {T_Mercenary} from 'TS_Mercenary';

import {RealityBox} from '../atoms/RealityBox';

type T_Props = {
  mercenary: T_Mercenary
  offset: number
  refSelectMercenaryBox: MutableRefObject<Mesh | undefined>
  setCheckedMercenaries: Dispatch<SetStateAction<number[]>>
}

const RealityMercenaryWages: React.FC<T_Props> = () => {
  return <RealityBox />;
};

RealityMercenaryWages.displayName = 'RealityMercenaryWages';
export {RealityMercenaryWages};
