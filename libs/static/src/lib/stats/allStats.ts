import {T_KnownStatBlocks} from 'TS_General';
import {T_ExportStats} from 'TS_Stats';

import brave from './brave';
import clever from './clever';
import farmer from './farmer';
import fighter from './fighter';
import goblin from './goblin';
import human from './human';
import leader from './leader';
import rogue from './rogue';

export const allStats: Record<T_KnownStatBlocks, T_ExportStats> = {
  brave,
  clever,
  farmer,
  fighter,
  goblin,
  human,
  leader,
  rogue,
};
