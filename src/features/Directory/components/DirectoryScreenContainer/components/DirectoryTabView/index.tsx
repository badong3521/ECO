import React from 'react';
import { TabView } from 'react-native-tab-view';
import styles from './style.css';
import DirectoryTabBar from '../DirectoryTabBar';

export interface TabData {
  title: string;
}

export interface TabRoutes<T extends TabData> {
  [key: string]: T;
}

interface DirectoryTabViewProps {
  currentTab: number;
  tabs: TabRoutes<TabData>;
  onChangeTab?: (index: number) => void;
}

export default function DirectoryTabView(props: DirectoryTabViewProps) {
  const { currentTab, tabs, onChangeTab } = props;

  const tabKeys = Object.keys(tabs);
  const currTab =
    currentTab >= tabKeys.length && tabKeys.length > 0
      ? tabKeys.length - 1
      : currentTab;
  return (
    <TabView
      style={[styles.tabContainer]}
      renderTabBar={tabProps => (
        <DirectoryTabBar currentTab={currTab} tabProps={tabProps} />
      )}
      navigationState={{
        index: currTab,
        routes: tabKeys.map((tab: string) => ({
          key: tab,
          // eslint-disable-next-line react/prop-types
          title: tabs[tab].title,
        })),
      }}
      renderScene={() => null}
      onIndexChange={index => {
        if (onChangeTab) {
          onChangeTab(index);
        }
      }}
    />
  );
}
