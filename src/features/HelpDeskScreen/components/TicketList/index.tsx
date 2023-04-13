import { FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from '../TicketTabs/style.css';
import Text from '../../../../components/Text';
import { Ticket as TicketType, Ticket, TicketStatus } from '../../reducers';
import TicketItem from '../Ticket';
import { LanguageType } from '../../../User/reducers';
import HelpDeskApi from '../../../../services/api/helpDesk';
import { START_PAGE } from '../../../../services/api/types/api';

const EmptyTicketsSvg = require('../../../../assets/helpDesk/png/empty_tickets.png');
const EmptyTicketsResolvedSvg = require('../../../../assets/helpDesk/png/create_success_logo.png');

interface TicketListProps {
  defaultTickets?: TicketType[];
  status?: TicketStatus;
  userLanguage: LanguageType;
  onClickTicket: (ticket: TicketType) => void;
}
const helpDeskApi = new HelpDeskApi();
export default function TicketList(props: TicketListProps) {
  const { status, userLanguage, onClickTicket, defaultTickets } = props;
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(START_PAGE);
  const i18n = useTranslation();
  const [tickets, setTickets] = useState<Ticket[] | undefined>(defaultTickets);

  async function refresh() {
    setLoading(true);
    const res = await helpDeskApi.fetchTickets({
      status: status === 'all' ? undefined : status,
      page: 0,
    });
    setLoading(false);
    if (res.status === 'success') {
      setTickets(res.result.data);
      setPage(START_PAGE);
      setTotalPage(res.result.totalPages);
    } else {
      setTickets([]);
    }
  }

  async function loadMore() {
    if (page >= totalPage || loading) return;
    setLoading(true);
    const res = await helpDeskApi.fetchTickets({
      status: status === 'all' ? undefined : status,
      page: page + 1,
    });
    setLoading(true);
    if (res.status === 'success') {
      setTickets(tickets?.concat(res.result.data));
      setPage(page + 1);
    }
  }
  function renderTicket(ticket: TicketType) {
    return (
      <TicketItem
        userLanguage={userLanguage}
        ticket={ticket}
        onClick={onClickTicket}
        key={ticket.id}
      />
    );
  }

  useEffect(() => {
    if (!defaultTickets) {
      refresh();
    }
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlatList
        contentContainerStyle={styles.list}
        data={tickets}
        keyExtractor={item => item.id.toString()}
        renderItem={item => renderTicket(item.item)}
        refreshing={loading}
        onRefresh={refresh}
        onEndReached={loadMore}
      />
      {!loading && tickets?.length === 0 && (
        <View style={styles.noTicketsContainer}>
          <FastImage
            style={styles.emptyImage}
            source={
              status === 'closed' ? EmptyTicketsResolvedSvg : EmptyTicketsSvg
            }
          />
          <Text bold="bold" style={styles.noTickets} fontSize="small">
            {i18n.t(`features.helpDesk.ticketList.emptyTitle.${status}`)}
          </Text>
          <Text style={styles.noTickets} fontSize="small">
            {i18n.t(`features.helpDesk.ticketList.emptyDesc.${status}`)}
          </Text>
        </View>
      )}
    </View>
  );
}
