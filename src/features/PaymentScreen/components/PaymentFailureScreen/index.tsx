import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import i18n from 'i18next';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';
import styles from './style.css';

const LOGO = require('../../../../assets/images/payment_failure.png');

interface Props {
  navigation: any;
}
export default function PaymentFailureScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.root}>
      <FastImage source={LOGO} style={styles.image} />
      <Heading size="h4" bold="bold">
        {i18n.t('features.paymentScreen.paymentFailed.title')}
      </Heading>
      <Text style={styles.message}>
        {navigation.getParam('errorMessage') || ''}
      </Text>

      <Button
        type="primary"
        uppercase={false}
        style={styles.button}
        title={i18n.t('actions.contactUs')}
        onPress={() => navigation.navigate('HelpDeskScreen')}
      />
      <Button
        type="primary"
        uppercase={false}
        style={styles.button}
        title={i18n.t('actions.goBack')}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
