import {T_NumGenSig} from 'TS_General';

type pickArraySig = (array: string[], randomNumberGenerator?: T_NumGenSig) => string

export const pickArray:pickArraySig = (array, randomNumberGenerator = Math.random):string => {
  return array[Math.floor(randomNumberGenerator() * array.length)];
};
