import React from 'react';
import { View } from 'react-native';
import i18n from 'i18next';
import NotFoundImage from '../../../../assets/images/not_found_v2.svg';
import Text from '../../../../components/Text';

import styles from './style.css';

export default function PaymentHistoryEmpty() {
  return (
    <View style={styles.container}>
      <NotFoundImage style={styles.image} />
      <Text style={styles.details} color="grey">
        {i18n.t('features.electricBill.emptyPaymentHistory')}
      </Text>
    </View>
  );
}
