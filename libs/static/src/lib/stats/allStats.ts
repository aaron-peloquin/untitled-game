import {T_ExportStats, T_KnownStatBlocks} from 'TS_Stats';

import brave from './brave';
import farmer from './farmer';
import fighter from './fighter';
import human from './human';

export const allStats: Record<T_KnownStatBlocks, T_ExportStats> = {
  brave,
  farmer,
  fighter,
  human,
};
