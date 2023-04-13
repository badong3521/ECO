import { Linking, ScrollView, Text } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Config from 'react-native-config';
import { TabBar, TabView } from 'react-native-tab-view';
import Heading from '../../../../components/Heading';
import BusCardPriceScreen from '../BusCardPriceScreen';
import TextLink from '../../../../components/TextLink';

import styles from './style.css';
import { applicationColors } from '../../../../../style.css';

export default function BusCardInformationScreen() {
  const { i18n } = useTranslation();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabs = [
    { key: 'instructions', title: i18n.t('headers.busCardInstructions') },
    { key: 'priceChart', title: i18n.t('headers.busCardPriceChartScreen') },
  ];

  function onViewDetailsPress() {
    Linking.openURL(`${Config.API_BASE_URL}/ecobus_instruction.pdf`);
  }

  function renderScene(key: string) {
    switch (key) {
      case 'instructions':
        return (
          <ScrollView style={styles.textContainer}>
            <Heading size="h2" style={styles.paddingBottom}>
              {i18n.t(
                'features.busScreen.busCardInformationScreen.headerRegistration',
              )}
            </Heading>
            <Text style={styles.paddingBottom}>
              {i18n.t(
                'features.busScreen.busCardInformationScreen.contentRegistration',
              )}
            </Text>
            <Heading size="h2" style={styles.paddingBottom}>
              {i18n.t(
                'features.busScreen.busCardInformationScreen.headerExtend',
              )}
            </Heading>
            <Text style={styles.paddingBottom}>
              {i18n.t(
                'features.busScreen.busCardInformationScreen.contentExtend',
              )}
            </Text>
            <TextLink
              key="ecobusInstructionDetails"
              linkColor={applicationColors.primary.shade900}
              onLinkPress={onViewDetailsPress}
            >
              {i18n.t(
                'features.busScreen.busCardInformationScreen.instructionDetails',
              )}
            </TextLink>
          </ScrollView>
        );
      case 'priceChart':
        return <BusCardPriceScreen />;
      default:
        return <></>;
    }
  }

  return (
    <TabView
      lazy
      renderTabBar={tabProps => (
        <TabBar
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...tabProps}
          indicatorStyle={styles.tabIndicator}
          labelStyle={styles.tabLabel}
          style={styles.tab}
        />
      )}
      navigationState={{
        index: currentTab,
        routes: tabs,
      }}
      renderScene={({ route }) => renderScene(route.key)}
      onIndexChange={setCurrentTab}
    />
  );
}
