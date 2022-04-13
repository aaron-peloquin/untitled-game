import {T_KnownQuestTypes} from 'TS_General';
import {T_RunQuestSig} from 'TS_Quest';

import {runSlayQuest} from './runSlayQuest';

export const questRunners: Record<T_KnownQuestTypes, T_RunQuestSig> = {
  Slay: runSlayQuest,
};
