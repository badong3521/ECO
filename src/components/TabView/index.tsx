import React, { useState } from 'react';
import { Dimensions, ScrollView, ViewStyle } from 'react-native';
import { TabBar, TabView as RTabView } from 'react-native-tab-view';
import { applicationColors } from '../../../style.css';

interface Route {
  key: string;
  title: string;
}

// sceneMap must follow the convention seen here: https://github.com/react-native-community/react-native-tab-view#renderscene-required
// NOTE: We go a bit against the documentation by wrapping the component in a ScrollView. This is done because
// of the following bug: https://github.com/react-native-community/react-native-tab-view/issues/290
// This means that SceneMap must be a function that takes an index and returns a ReactNode.
interface TabViewProps {
  routes: Route[];
  sceneMap: any;
  style?: ViewStyle | ViewStyle[];
  tabStyle?: ViewStyle | ViewStyle[];
  scrollable?: boolean;
}

// Renders a tab view that can switch between multiple pieces of content
// and can be displayed directly within a component
export default function TabView(props: TabViewProps) {
  const { routes, sceneMap, style, scrollable } = props;
  const [index, setIndex] = useState(0);

  function renderTabBar(tabProps: any) {
    return (
      <TabBar
        // eslint-disable-next-line
        {...tabProps}
        scrollEnabled={scrollable}
        indicatorStyle={{ backgroundColor: applicationColors.primary.shade900 }}
        style={[{ backgroundColor: 'transparent', elevation: 0 }, style]}
        activeColor={applicationColors.primary.shade900}
        inactiveColor={applicationColors.secondary.softBlack}
        tabStyle={{ width: 'auto' }}
      />
    );
  }

  return (
    <ScrollView>
      <RTabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={() => null}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width }}
        style={style}
      />
      {sceneMap(index)}
    </ScrollView>
  );
}
