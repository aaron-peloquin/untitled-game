import {T_NumGenSig} from 'TS_General';

type pickRangeSig = (
  min:number,
  max:number,
  multiplier?: number,
  places?: number
) => number

type curriedFnSig = (randomNumberGenerator?: T_NumGenSig) => pickRangeSig

export const pickRange:curriedFnSig = (randomNumberGenerator = Math.random) => (min, max, multiplier = 1, places = 2) => {
  const random = randomNumberGenerator();
  const result = (((random * (max - min) + min) * multiplier).toFixed(places));
  return parseFloat(result);
};
