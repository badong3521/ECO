import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Ticket as TicketType, TicketStatus } from '../../reducers';
import Loader from '../../../../components/Loader';
import styles from './style.css';
import Button from '../../../../components/Button';
import DirectoryTabBar from '../../../Directory/components/DirectoryScreenContainer/components/DirectoryTabBar';
import { LanguageType } from '../../../User/reducers';
import TicketList from '../TicketList';

interface Props {
  allTickets?: TicketType[];
  onClickTicket: (ticket: TicketType) => void;
  loading: boolean; // Are we still fetching?
  onSendFeedbackPress: () => void;
  userLanguage: LanguageType;
}

// Render a list of Help Desk tickets.
export default function TicketTabs(props: Props) {
  const {
    onClickTicket,
    loading,
    onSendFeedbackPress,
    userLanguage,
    allTickets,
  } = props;
  const { i18n } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);

  function renderScene(status: TicketStatus) {
    return (
      <TicketList
        status={status}
        userLanguage={userLanguage}
        onClickTicket={onClickTicket}
        defaultTickets={status === 'all' ? allTickets : undefined}
      />
    );
  }
  return (
    <View style={styles.container}>
      <TabView
        style={styles.tabContainer}
        renderTabBar={tabProps => (
          <DirectoryTabBar
            currentTab={currentTab}
            tabProps={tabProps}
            style={styles.tab}
            indicatorContainerStyle={styles.tabIndicator}
          />
        )}
        navigationState={{
          index: currentTab,
          routes: TABS.map(tab => ({
            key: tab,
            title: i18n.t(`features.helpDesk.ticketList.tabs.${tab}`),
          })),
        }}
        renderScene={({ route }) => renderScene(route.key)}
        onIndexChange={index => {
          setCurrentTab(index);
        }}
      />

      {loading && <Loader />}
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          type="primary"
          title={i18n.t('features.helpDesk.ticketList.createRequest')}
          uppercase={false}
          onPress={onSendFeedbackPress}
        />
      </View>
    </View>
  );
}

const TABS: TicketStatus[] = ['all', 'open', 'response', 'closed'];
