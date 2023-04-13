import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import { useBusCardState } from '../../reducers/busCard';
import styles from './style.css';

const LOGO = require('../../../../assets/images/payment_successful.png');

interface BusCardPaymentSuccessfulScreenProps {
  navigation: any;
}
export default function BusCardPaymentSuccessfulScreen(
  props: BusCardPaymentSuccessfulScreenProps,
) {
  const [, busCardActions] = useBusCardState();
  const { navigation } = props;
  const { nextScreen } = navigation.state.params;
  const i18n = useTranslation();

  function onButtonPress() {
    busCardActions.setLastReload(new Date().getMilliseconds());
    navigation.navigate(nextScreen);
  }

  return (
    <View style={styles.root}>
      <FastImage source={LOGO} style={styles.image} />
      <Heading size="h4" bold="bold">
        {i18n.t('features.busScreen.busPayment.paymentSuccessful.title')}
      </Heading>
      <Text style={styles.message}>
        {i18n.t('features.busScreen.busPayment.paymentSuccessful.message')}
      </Text>
      <Button
        type="primary"
        uppercase={false}
        style={styles.button}
        title={i18n.t('actions.goBack')}
        onPress={onButtonPress}
      />
    </View>
  );
}
