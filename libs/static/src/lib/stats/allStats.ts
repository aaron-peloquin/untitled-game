import { T_KnownStatBlocks } from 'TS_General';
import {T_ExportStats} from 'TS_Stats';

import brave from './brave';

import farmer from './farmer';
import fighter from './fighter';

import human from './human';
import leader from './leader';

export const allStats: Record<T_KnownStatBlocks, T_ExportStats> = {
  brave,
  farmer,
  fighter,
  human,
  leader,
};
