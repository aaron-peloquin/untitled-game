import * as seedrandom from 'seedrandom';
import {T_NumGenSig} from 'TS_General';
const {alea} = seedrandom;

export const seedGenerator = (seed:string):T_NumGenSig => {
  const numGenerator:T_NumGenSig = alea(seed);
  return numGenerator;
};
