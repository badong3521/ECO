import React, { useEffect } from 'react';
import { LayoutAnimation, View } from 'react-native';
// import { useTranslation } from 'react-i18next';
// import { TabView } from 'react-native-tab-view';
import { CUSTOM_ANIMATE_SPRING } from '../../../Authentication/components/SignUpScreen';
import { useUserState } from '../../../User/reducers';
import BusCardsList from './components/BusCardsList';
// import BusCardTabBar from './components/BusCardTabBar';
import styles from './style.css';

export default function BusCardScreen() {
  // const [currentTab, setCurrentTab] = useState(0);
  const [userState] = useUserState();
  const { busCards } = userState;

  // const { i18n } = useTranslation();
  // function renderTab(key: string) {
  //   if (key === 'busCard') {
  //     return <BusCardsList />;
  //   }
  //   return <View />;
  // }

  useEffect(() => {
    LayoutAnimation.configureNext(CUSTOM_ANIMATE_SPRING);
  }, [busCards?.length]);

  return (
    <View style={styles.root}>
      {/* TODO: Add bus pass */}
      {/* <TabView
        renderTabBar={tabProps => {
          return <BusCardTabBar tabProps={tabProps} />;
        }}
        navigationState={{
          index: currentTab,
          routes: TABS.map((tab: string) => ({
            key: tab,
            title: i18n.t(`features.busScreen.busCardScreen.tab.${tab}`),
          })),
        }}
        renderScene={scene => renderTab(scene.route.key)}
        onIndexChange={index => {
          setCurrentTab(index);
        }}
      /> */}
      <BusCardsList />
    </View>
  );
}

// const TABS = ['busCard', 'singlePass'];
