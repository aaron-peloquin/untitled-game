import * as chanceExport from 'chance';

const chance = chanceExport.Chance;

export const randomName = (generate = chance()) => generate.bool() ? generate.first() : generate.last();
