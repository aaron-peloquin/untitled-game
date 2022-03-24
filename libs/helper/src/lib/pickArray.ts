type pickArraySig = (array: string[], randomNumberGenerator?: () => number) => string

export const pickArray:pickArraySig = (array, randomNumberGenerator = Math.random):string => {
  return array[Math.floor(randomNumberGenerator() * array.length)];
};
