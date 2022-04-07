import {memo} from 'react';

import {Card, T_CardLayer} from '../molecules/Card';
import {TabSelector} from '../tabs/TabSelector';
import {TabsProvider} from '../tabs/TabsProvider';

type T_Props = {
    defaultTab?: string
    layer: T_CardLayer
  }

export const Tabs: React.FC<T_Props> = memo(({defaultTab, layer, children}) => {
  return <TabsProvider defaultTab={defaultTab}>
    <Card layer={layer} heading="Some Tabs!!!1">
      <TabSelector />
      {children}
    </Card>
  </TabsProvider>;
});
