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

  const updateTabs = useCallback(() => {
    refTabs.current = refTabs.current.sort((a, b) => (a.sort || 0) > (b.sort || 0) ? 0 : -1);
    setTabs(_.cloneDeep(refTabs.current));
  }, []);


  const registerTab = useCallback((tab: T_Tab) => {
    if (!refTabs.current.some(({id}) => tab.id === id)) {
      if (!tab.sort) {
        tab.sort = refTabs.current.length + 1;
      }
      refTabs.current.push(tab);
      updateTabs();
    }
  }, [updateTabs]);

  const deregisterTab = useCallback((tab: T_Tab) => {
    const tabIsRegistered = refTabs.current.some(({id}) => tab.id === id);

    if (tabIsRegistered) {
      refTabs.current = refTabs.current.filter(({id}) => tab.id !== id);
      updateTabs();
    }
  }, [updateTabs]);

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
