import {T_KnownQuestTypes} from 'TS_General';
import {T_RunQuestSig} from 'TS_Quest';

import {runFollowQuest} from './runFollowQuest';
import {runSlayQuest} from './runSlayQuest';

export const questRunners: Record<T_KnownQuestTypes, T_RunQuestSig> = {
  follow: runFollowQuest,
  slay: runSlayQuest,
};
