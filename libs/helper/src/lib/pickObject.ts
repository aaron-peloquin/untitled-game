import {pickArray} from './pickArray';

type pickObjectSig = <T>(obj: Record<string, T>, randomNumberGenerator?: () => number) => [string, T]

export const pickObject: pickObjectSig = (obj, randomNumberGenerator) => {
  const keys = Object.keys(obj);
  const key = pickArray(keys, randomNumberGenerator);
  const value = obj[key];
  return [key, value];
};
