import * as chance from 'chance';

export const randomName = (generate = chance()) => generate.bool() ? generate.first() : generate.last();
