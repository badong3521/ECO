import React from 'react';
import { View } from 'react-native';
import { Ticket as TicketType } from '../../reducers';
import TouchableComponent from '../../../../components/TouchableComponent';
import Text from '../../../../components/Text';
import TicketResponseStatus from '../TicketResponseStatus';
import styles from './style.css';
import { getDateTimeHHmmDDMMYYYY } from '../../../../utils/date';
import { LanguageType } from '../../../User/reducers';

interface Props {
  ticket: TicketType;
  onClick: (ticket: TicketType) => void;
  userLanguage: LanguageType;
}

export default function Ticket(props: Props) {
  const { ticket, onClick, userLanguage } = props;

  const emitPress = () => onClick(ticket);

  return (
    <TouchableComponent onPress={emitPress}>
      <View style={styles.container}>
        <View>
          <Text
            fontSize="small"
            numberOfLines={1}
            style={styles.topic}
            color="grey"
          >
            {ticket.ecofeedbackTopic?.name[userLanguage] || ''}
          </Text>
          <Text bold="bold" numberOfLines={2} style={styles.subject}>
            {ticket.subject}
          </Text>
          <Text fontSize="small" style={styles.subtext}>
            {getDateTimeHHmmDDMMYYYY(
              ticket.latestCommentCreatedAt || ticket.createdAt,
            )}
          </Text>
        </View>
        <View style={styles.status}>
          <TicketResponseStatus status={ticket.status} />
        </View>
      </View>
    </TouchableComponent>
  );
}
