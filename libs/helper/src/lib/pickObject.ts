import {pickArray} from './pickArray';

type pickObjectSig = <T>(obj: Record<string, T>) => [string, T]

export const pickObject: pickObjectSig = (obj) => {
  const keys = Object.keys(obj);
  const key = pickArray(keys);
  const value = obj[key];
  return [key, value];
};
