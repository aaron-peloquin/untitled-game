import {memo} from 'react';

import {Card, T_CardLayer} from '../molecules/Card';
import {TabSelector} from '../tabs/TabSelector';
import {TabsProvider} from '../tabs/TabsProvider';
import {T_TabId} from '../tabsContext';

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
