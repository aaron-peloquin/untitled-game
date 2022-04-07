import {emptyFunction} from '@static';
import {createContext} from 'react';

type T_TabId = string
type T_TabName = string

export type T_Tabs = Record<T_TabId, T_TabName>

export type T_Tab = {
  id: string
  name: string
  sort?: number
}

export type T_tabsContextValue = {
  currentTabId: string
  deregisterTab: (removeTabId: T_Tab) => void
  setCurrentTabId: (id: T_TabId) => void
  registerTab: (tab: T_Tab) => void
  tabs: T_Tab[]
}

const tabsContextDefault:T_tabsContextValue = {
  currentTabId: '',
  deregisterTab: emptyFunction,
  registerTab: emptyFunction,
  setCurrentTabId: emptyFunction,
  tabs: [],
};

export const tabsContext = createContext<T_tabsContextValue>(tabsContextDefault);
