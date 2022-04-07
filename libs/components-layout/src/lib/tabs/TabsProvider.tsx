import _ from 'lodash';
import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {tabsContext, T_Tab, T_tabsContextValue} from '../tabsContext';


const Provider = tabsContext.Provider;

type T_Props = {
  defaultTab?: string
}
export const TabsProvider:React.FC<T_Props> = memo(({children, defaultTab = ''}) => {
  const refTabs = useRef<T_Tab[]>([]);
  const [currentTabId, setCurrentTabId] = useState(defaultTab);
  const [tabs, setTabs] = useState<T_Tab[]>([]);

  const registerTab = useCallback((tab: T_Tab) => {
    if (!refTabs.current.some(({id}) => tab.id === id)) {
      console.log('registering', tab);
      refTabs.current.push(tab);
      setTabs(_.cloneDeep(refTabs.current));
    }
  }, []);

  const deregisterTab = useCallback((tab: T_Tab) => {
    const tabIsRegistered = refTabs.current.some(({id}) => tab.id === id);
    console.log('deregistering?', tabIsRegistered, tab);

    if (tabIsRegistered) {
      refTabs.current = refTabs.current.filter(({id}) => tab.id !== id);
      console.log('new tabs:', _.cloneDeep(refTabs.current));
      setTabs(_.cloneDeep(refTabs.current));
    }
  }, []);

  useEffect(() => {
    if (!currentTabId && tabs.length > 0) {
      setCurrentTabId(tabs[0].id);
    }
  }, [currentTabId, tabs]);

  const providerValue:T_tabsContextValue = useMemo(() => ({currentTabId, deregisterTab, registerTab, setCurrentTabId, tabs}), [currentTabId, deregisterTab, registerTab, tabs]);

  console.log('tabs', tabs);

  return <Provider value={providerValue}>
    {children}
  </Provider>;
});
