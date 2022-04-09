import {memo} from 'react';

import {T_TabId} from './tabsContext';
import {TabSelector} from './TabSelector';
import {TabsProvider} from './TabsProvider';

import {T_CardLayer, Card} from '../molecules/Card';

type T_Props = {
    defaultTab?: T_TabId
    layer: T_CardLayer
  }

export const Tabs: React.FC<T_Props> = memo(({defaultTab, layer, children}) => {
  return <TabsProvider defaultTab={defaultTab}>
    <Card layer={layer}>
      <TabSelector />
      {children}
    </Card>
  </TabsProvider>;
});
