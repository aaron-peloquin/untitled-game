import {T_Band} from 'TS_Band';

export const getMaxBandMercenaries = (band?: T_Band) => Math.round((band?.level || 1) + 1);
