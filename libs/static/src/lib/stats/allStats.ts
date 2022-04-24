import {T_KnownStatBlocks} from 'TS_General';
import {T_ExportStats} from 'TS_Stats';

import brave from './datafiles/brave';
import butcher from './datafiles/butcher';
import clever from './datafiles/clever';
import farmer from './datafiles/farmer';
import fighter from './datafiles/fighter';
import fisher from './datafiles/fisher';
import goblin from './datafiles/goblin';
import human from './datafiles/human';
import leader from './datafiles/leader';
import rogue from './datafiles/rogue';


export const allStats: Record<T_KnownStatBlocks, T_ExportStats> = {
  brave,
  butcher,
  clever,
  farmer,
  fighter,
  fisher,
  goblin,
  human,
  leader,
  rogue,
};
