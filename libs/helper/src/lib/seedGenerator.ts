import * as seedrandom from 'seedrandom';

type randomSeedSig = () => number

export const seedGenerator = (seed:string):randomSeedSig => {
  return seedrandom(seed);
};
