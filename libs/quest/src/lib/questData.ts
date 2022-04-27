import {IconType} from 'react-icons';
import {GiShadowFollower, GiWarAxe} from 'react-icons/gi';
import {T_KnownQuestTypes} from 'TS_General';

type T_SomeObj = {
  label: string
  icon: IconType
}

export const questData: Record<T_KnownQuestTypes, T_SomeObj> = {
  follow: {
    icon: GiShadowFollower,
    label: 'Follow',
  },
  slay: {
    icon: GiWarAxe,
    label: 'Slay',
  },
};
