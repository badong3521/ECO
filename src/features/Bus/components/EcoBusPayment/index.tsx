import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Loader from '../../../../components/Loader';
import useBackButton from '../../../../utils/hooks/useBackButton';
import DialogManager from '../../../../components/Dialog/manager';
import { useUserState } from '../../../User/reducers';
import { getFailedMessage } from '../../../EcoId/components/EcoIdPayment';

import { applicationColors } from '../../../../../style.css';

interface EcoBusPaymentScreenProps {
  navigation: any;
}

// Use Webview to payment, then handle the redirect url to check the state
export default function EcoBusPaymentScreen(props: EcoBusPaymentScreenProps) {
  const { navigation } = props;
  const { paymentUrl } = navigation.state.params;
  const [loading, setLoading] = useState<boolean>();
  const [userState] = useUserState();
  const i18n = useTranslation();

  function onPaymentSuccessfull() {
    navigation.navigate('BusCardPaymentSuccessfulScreen', {
      nextScreen: 'BusCardScreen',
      refreshBusCard: true,
    });
  }

  function onPaymentFailed(message?: string | null, orderRef?: string | null) {
    navigation.pop();
    navigation.navigate('BusCardPaymentFailureScreen', {
      errorMessage: i18n.t(
        'features.busScreen.busPayment.paymentFailure.message',
        {
          message,
          orderRef,
        },
      ),
    });
  }

  function onBackPress() {
    DialogManager.showConfirmDialog({
      confirmTitle: i18n.t('actions.yes'),
      returnTitle: i18n.t('actions.no'),
      title: i18n.t('features.ecoId.ecoIdPaymentScreen.confirmDiscardMessage'),
      onConfirmPress: () => navigation.navigate('ExtendBusCardScreen'),
      confirmColor: applicationColors.semantic.error.shade500,
    });
  }

  // Detect the success and failed event when webview starts to load new url
  function onShouldStartLoadWithRequest(event: WebViewNavigation): boolean {
    const url = event.mainDocumentURL || event.url; // ios is using `mainDocumentURL`, but android using `url`
    if (url.startsWith('ecoone://ecobus')) {
      if (url.indexOf('status=SUCCESS') > 0) {
        onPaymentSuccessfull();
      } else {
        const failedMessages = getFailedMessage(url, userState.userLanguage);
        onPaymentFailed(failedMessages[0], failedMessages[1]);
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
        originWhitelist={['ecoone://ecobus', 'https://', 'http://']}
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
