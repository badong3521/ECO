import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import TicketTabs from './components/TicketTabs';
import HelpDeskApi, { FetchTicketsParams } from '../../services/api/helpDesk';
import useStatusBar from '../../utils/hooks/useStatusBar';
import { Ticket, Topic, useHelpDeskState } from './reducers';
import styles from './style.css';
import EmptyTickets from './components/EmptyTickets';
import ChooseTopicModal from './components/ChooseTopicModal';
import { useUserState } from '../User/reducers';
import Loader from '../../components/Loader';

interface Props {
  navigation: any;
}

export default function HelpDeskScreen(props: Props) {
  const { navigation } = props;
  const [helpDeskState, helpDeskActions] = useHelpDeskState();
  const [userState] = useUserState();
  const { roles } = helpDeskState;
  const [loading, setLoading] = useState<boolean>(true);
  const [tickets, setTickets] = useState<Ticket[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const api = new HelpDeskApi();

  // Set tickets in reducer to be equal to newest data
  async function fetchListTickets() {
    setLoading(true);
    const newTickets = await fetchTickets(api);
    if (newTickets) {
      setTickets(newTickets);
    } else {
      setTickets([]);
    }
    setLoading(false);
  }

  function onClickTicket(ticket: Ticket) {
    navigation.navigate('HelpDeskTicketScreen', {
      ticket,
    });
  }

  function onOpenChooseTopicModal() {
    setVisible(true);
  }

  function onPressCreate(topic: Topic) {
    setVisible(false);
    navigation.navigate('CreateTicketScreen', {
      topic,
    });
  }

  // Fetch new tickets when the page is loaded
  useEffect(() => {
    api.fetchRoles();
    fetchListTickets();
  }, []);

  // Make sure to refetch tickets if we need to (fx after creating a ticket)
  useEffect(() => {
    if (helpDeskState.shouldRefreshTickets) {
      fetchListTickets();
      helpDeskActions.setShouldRefreshTickets(false);
    }
  }, [helpDeskState.shouldRefreshTickets]);

  // Make sure status bar is always correct
  useStatusBar('dark-content');

  return (
    <View style={styles.container}>
      {!loading && tickets && tickets.length > 0 && (
        <TicketTabs
          userLanguage={userState.userLanguage}
          onClickTicket={onClickTicket}
          loading={loading}
          onSendFeedbackPress={onOpenChooseTopicModal}
          allTickets={tickets}
        />
      )}
      {!loading && tickets && tickets.length === 0 && (
        <EmptyTickets
          loading={!tickets}
          onSendFeedbackPress={onOpenChooseTopicModal}
        />
      )}
      {loading && <Loader style={styles.loading} />}
      {roles && (
        <ChooseTopicModal
          userLanguage={userState.userLanguage}
          roles={roles}
          onTopicSelected={onPressCreate}
          visible={visible}
          onClosed={() => setVisible(false)}
        />
      )}
    </View>
  );
}

async function fetchTickets(
  api: any,
  params?: FetchTicketsParams,
): Promise<Ticket[] | undefined> {
  const result = await api.fetchTickets(params);
  if (result.status === 'success') {
    return result.result.data;
  }
  return undefined;
}
