import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import i18n from 'i18next';
import { LanguageType } from '../User/reducers';
import Loader from '../../components/Loader';
import useBackButton from '../../utils/hooks/useBackButton';
import DialogManager from '../../components/Dialog/manager';
import { getFailedMessage } from '../EcoId/components/EcoIdPayment';

import styles from './style.css';
import { applicationColors } from '../../../style.css';

interface EcoBusPaymentScreenProps {
  paymentUrl: string;
  callBackUrl: string;
  userLanguage: LanguageType;
  onPaymentSuccessfull: () => any;
  onPaymentFailed: (errorMessage: string) => any;
  onBackPressCallback: () => any;
  navigation: any;
  isEcotekSupport?: boolean;
}

// Use Webview to payment, then handle the redirect url to check the state
export default function PaymentScreen(props: EcoBusPaymentScreenProps) {
  const {
    paymentUrl,
    callBackUrl,
    userLanguage,
    onPaymentSuccessfull,
    onPaymentFailed,
    onBackPressCallback,
    navigation,
    isEcotekSupport,
  } = props;
  const [loading, setLoading] = useState<boolean>();

  function onBackPress() {
    DialogManager.showConfirmDialog({
      confirmTitle: i18n.t('actions.yes'),
      returnTitle: i18n.t('actions.no'),
      title: i18n.t('features.paymentScreen.confirmDiscardMessage'),
      onConfirmPress: () => onBackPressCallback,
      confirmColor: applicationColors.semantic.error.shade500,
    });
  }

  // Detect the success and failed event when webview starts to load new url
  function onShouldStartLoadWithRequest(event: WebViewNavigation): boolean {
    const url = event.mainDocumentURL || event.url; // ios is using `mainDocumentURL`, but android using `url`
    if (url.startsWith(callBackUrl)) {
      if (url.indexOf('status=SUCCESS') > 0) {
        onPaymentSuccessfull();
      } else {
        const failedMessages = getFailedMessage(url, userLanguage);
        navigation.pop();
        onPaymentFailed(
          i18n.t(
            `features.paymentScreen.${
              isEcotekSupport ? 'errorMessageEcotekSupport' : 'errorMessage'
            }`,
            {
              message: failedMessages[0],
              orderRef: failedMessages[1],
            },
          ),
        );
      }
      return false;
    }
    return true;
  }

  useBackButton(() => {
    onBackPress();
    return true;
  });

  // pass the backPress call back to the header button in the navigation
  useEffect(() => {
    navigation.setParams({
      onBackPress,
    });
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        originWhitelist={[callBackUrl, 'https://', 'http://']}
        onLoadStart={() => {
          setLoading(true);
        }}
        onNavigationStateChange={event => {
          if (Platform.OS === 'android') {
            setLoading(event.loading);
          }
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      {loading && (
        <Loader
          color={applicationColors.semantic.info.shade500}
          style={styles.loading}
        />
      )}
    </View>
  );
}
