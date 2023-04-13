import { View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Button from '../../../../../../components/Button';
import Text from '../../../../../../components/Text';

interface ResolveTicketContainerProps {
  onResolveTicket: () => void;
}
export default function ResolveTicketContainer(
  props: ResolveTicketContainerProps,
) {
  const { onResolveTicket } = props;
  const i18n = useTranslation();
  const [asking, setAsking] = useState<boolean>(false);

  function toggle(ask: boolean) {
    setAsking(ask);
  }

  return asking ? (
    <View style={styles.container}>
      <Text style={styles.message}>
        {i18n.t('features.helpDesk.ticketScreen.messageConfirmCloseTopic')}
      </Text>
      <Button
        type="primary"
        title={i18n.t('features.helpDesk.ticketScreen.resolveLabel')}
        onPress={onResolveTicket}
        fontColor="light"
        style={styles.resolve}
        uppercase={false}
        labelStyle={styles.resolveLabel}
      />
      <Button
        type="text"
        title={i18n.t('features.helpDesk.ticketScreen.continue')}
        labelStyle={styles.continue}
        uppercase={false}
        onPress={() => {
          toggle(false);
        }}
      />
    </View>
  ) : (
    <Button
      type="secondary"
      title={i18n.t('features.helpDesk.ticketScreen.resolveLabel')}
      onPress={() => toggle(true)}
      style={styles.closeButton}
      uppercase={false}
      labelStyle={styles.closeLabel}
    />
  );
}
