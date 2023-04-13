import { TabBar, TabBarIndicator } from 'react-native-tab-view';
import React from 'react';
import { ViewStyle } from 'react-native';
import styles from '../DirectoryTabView/style.css';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

interface DirectoryTabBarProps {
  currentTab: number;
  tabProps: any;
  style?: ViewStyle;
  indicatorContainerStyle?: ViewStyle;
}
export default function DirectoryTabBar(props: DirectoryTabBarProps) {
  const { currentTab, tabProps, style, indicatorContainerStyle } = props;
  return (
    <TabBar
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...tabProps}
      scrollEnabled
      getLabelText={({ route }) => route.title}
      style={[styles.tab, style]}
      tabStyle={styles.tabStyle}
      activeColor={applicationColors.primary.shade900}
      inactiveColor={applicationColors.neutral.shade500}
      indicatorStyle={styles.indicatorStyle}
      indicatorContainerStyle={[
        styles.indicatorContainer,
        indicatorContainerStyle,
      ]}
      labelStyle={styles.label}
      renderIndicator={indicatorProps => {
        const width = Math.max(
          indicatorProps.getTabWidth(currentTab) -
            applicationDimensions.defaultPadding * 2,
          0,
        );
        return (
          <TabBarIndicator
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...indicatorProps}
            // @ts-ignore
            width={width > 0 ? width : undefined}
          />
        );
      }}
    />
  );
}
