import {T_NumGenSig} from 'TS_General';

import {pickArray} from './pickArray';

type pickObjectSig = <T>(obj: Record<string, T>, randomNumberGenerator?: T_NumGenSig) => [string, T]

export const pickObject: pickObjectSig = (obj, randomNumberGenerator) => {
  const keys = Object.keys(obj);
  const key = pickArray(keys, randomNumberGenerator);
  const value = obj[key];
  return [key, value];
};
