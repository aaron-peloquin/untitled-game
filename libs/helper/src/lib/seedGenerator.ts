import * as seedrandom from 'seedrandom';
const {alea} = seedrandom
type randomSeedSig = () => number

export const seedGenerator = (seed:string):randomSeedSig => {
  return alea(seed);
};
