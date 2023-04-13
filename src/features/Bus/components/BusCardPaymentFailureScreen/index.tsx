import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import styles from './style.css';

const LOGO = require('../../../../assets/images/payment_failure.png');

interface BusCardPaymentFailureScreenProps {
  navigation: any;
}
export default function BusCardPaymentFailureScreen(
  props: BusCardPaymentFailureScreenProps,
) {
  const { navigation } = props;

  const i18n = useTranslation();
  return (
    <View style={styles.root}>
      <FastImage source={LOGO} style={styles.image} />
      <Heading size="h4" bold="bold">
        {i18n.t('features.busScreen.busPayment.paymentFailure.title')}
      </Heading>
      <Text style={styles.message}>
        {navigation.getParam('errorMessage') || ''}
      </Text>

      <Button
        type="primary"
        uppercase={false}
        style={styles.button}
        title={i18n.t('features.busScreen.busCardScreen.contact')}
        onPress={() => navigation.navigate('HelpDeskScreen')}
      />
    </View>
  );
}
