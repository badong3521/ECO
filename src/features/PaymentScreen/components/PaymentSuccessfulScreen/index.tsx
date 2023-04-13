import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import i18n from 'i18next';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';

import styles from './style.css';

const LOGO = require('../../../../assets/images/payment_successful.png');

interface Props {
  navigation: any;
}
export default function PaymentSuccessfulScreen(props: Props) {
  const { navigation } = props;
  const { nextScreen } = navigation.state.params;

  function onButtonPress() {
    navigation.navigate(nextScreen);
  }

  return (
    <View style={styles.root}>
      <FastImage source={LOGO} style={styles.image} />
      <Heading size="h4" bold="bold">
        {i18n.t('features.paymentScreen.paymentSuccessful.title')}
      </Heading>
      <Text style={styles.message}>
        {i18n.t('features.paymentScreen.paymentSuccessful.message')}
      </Text>
      <Button
        type="primary"
        uppercase={false}
        style={styles.button}
        title={i18n.t('actions.ok')}
        onPress={onButtonPress}
      />
    </View>
  );
}
