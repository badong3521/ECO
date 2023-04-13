import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from './style.css';
import Text from '../../../../components/Text';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';

const EmptyTicketsSvg = require('../../../../assets/helpDesk/png/empty_tickets.png');

interface EmptyTicketsProps {
  onSendFeedbackPress: () => void;
  loading: boolean;
}
export default function EmptyTickets(props: EmptyTicketsProps) {
  const { onSendFeedbackPress, loading } = props;
  const i18n = useTranslation();
  return (
    <View style={styles.container}>
      <FastImage style={styles.emptyImage} source={EmptyTicketsSvg} />
      <Heading bold="bold" size="h5" style={styles.title}>
        {i18n.t('features.helpDesk.emptyState.title')}
      </Heading>
      <Text style={styles.desc}>
        {i18n.t('features.helpDesk.emptyState.desc')}
      </Text>
      <Button
        style={styles.button}
        type="primary"
        loading={loading}
        title={i18n.t('features.helpDesk.ticketList.createRequest')}
        uppercase={false}
        onPress={onSendFeedbackPress}
      />
    </View>
  );
}
