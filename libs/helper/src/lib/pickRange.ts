type pickRangeSig = (
    min:number,
    max:number,
    multiplier?: number,
    places?: number
) => number

export const pickRange:pickRangeSig = (min, max, multiplier=1, places=2) => {
  const random = Math.random();
  const result = (((random * (max - min) + min)*multiplier).toFixed(places));
  return parseFloat(result);
};
