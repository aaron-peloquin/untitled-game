import {Fragment, memo} from 'react';

import {T_CardLayer} from 'TS_General';

import {T_TabId} from './tabsContext';
import {TabSelector} from './TabSelector';
import {TabsProvider} from './TabsProvider';

import {Card} from '../molecules/Card';

type T_Props = {
    defaultTab?: T_TabId
    layer: T_CardLayer
  }

const Tabs: React.FC<T_Props> = memo(({defaultTab, layer, children}) => {
  const hasCard = !!layer;
  const Wrapper = hasCard ? Fragment : Card;
  return <TabsProvider defaultTab={defaultTab}>
    <Wrapper layer={layer}>
      <TabSelector />
      {children}
    </Wrapper>
  </TabsProvider>;
});

Tabs.displayName = 'Tabs';
export {Tabs};
