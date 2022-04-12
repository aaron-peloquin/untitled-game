import {T_NumGenSig} from 'TS_General';

type pickArraySig = <T_ArrayValueType=string>(array: T_ArrayValueType[], randomNumberGenerator?: T_NumGenSig) => T_ArrayValueType

export const pickArray:pickArraySig = (array, randomNumberGenerator = Math.random) => {
  return array[Math.floor(randomNumberGenerator() * array.length)];
};
