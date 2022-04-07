import {memo, useContext, useEffect, useMemo} from 'react';

import style from './Tab.module.css';

import {tabsContext} from '../tabsContext';

type T_Props = {
  name: string
  id: string
}
export const Tab: React.FC<T_Props> = memo(({children, id, name}) => {
  const tabsData = useContext(tabsContext);
  const {deregisterTab, registerTab, tabs} = tabsData;

  useEffect(() => {
    const isTabRegistered = tabs.some((tab) => tab.id === id);
    if (!isTabRegistered) {
      console.log('registering:', id);
      registerTab({id, name});
    }
  }, [id, name, registerTab, tabs]);

  useEffect(() => {
    return () => {
      console.log('deregistering', id);
      deregisterTab(id);
    };
  }, []);


  const classNames = useMemo(() => id === tabsData.currentTabId ? `${style['tab']} ${style['active-tab']}` : style['tab'], [id, tabsData.currentTabId]);

  return <div
    className={classNames}
    tabIndex={0}
    role="tabpanel"
    id={`${id}-tab`}
    aria-labelledby={id}
  >
    {children}
  </div>;
});
