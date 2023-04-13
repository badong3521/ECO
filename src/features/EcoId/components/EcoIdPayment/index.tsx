import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import styles from './style.css';
import Loader from '../../../../components/Loader';
import { applicationColors } from '../../../../../style.css';
import useBackButton from '../../../../utils/hooks/useBackButton';
import DialogManager from '../../../../components/Dialog/manager';
import { fetchTotalAmount } from '../../../../utils/ecoId';
import { LanguageType, useUserState } from '../../../User/reducers';
import Firebase from '../../../../services/firebase';

interface EcoIdPaymentScreenProps {
  navigation: any;
}

// Use Webview to payment, then handle the redirect url to check the state
export default function EcoIdPaymentScreen(props: EcoIdPaymentScreenProps) {
  const { navigation } = props;
  const { paymentUri, residentId, paidMonths } = navigation.state.params;
  const [loading, setLoading] = useState<boolean>();
  const [userState, userActions] = useUserState();
  const i18n = useTranslation();

  function onPaymentSuccessfull() {
    userActions.setReloadUserDashboard(true);
    Firebase.track('pay_bill_successful');
    // will go back to the ResidenceScreen, pop current screen and PreparePaymentScreen
    navigation.pop();
    navigation.pop();
    fetchTotalAmount(residentId);
    // navigation.navigate('EcoIdPromotionSuccessful', {
    //   onButtonPress: () => {
    //     navigation.navigate('EcoIdPaymentHistoryScreen', {
    //       residenceId: residentId,
    //       paidMonths,
    //     });
    //   },
    // });
    navigation.navigate('EcoIdSuccessfulScreen', {
      title: i18n.t('features.ecoId.ecoIdPaymentScreen.success.header'),
      message: i18n.t('features.ecoId.ecoIdPaymentScreen.success.body'),
      button: i18n.t('features.ecoId.ecoIdPaymentScreen.success.button'),
      onButtonPress: () => {
        navigation.navigate('EcoIdPaymentHistoryScreen', {
          residenceId: residentId,
          paidMonths,
        });
      },
    });
  }

  function onPaymentFailed(message?: string | null, orderRef?: string | null) {
    Firebase.track('pay_bill_successful');
    navigation.goBack();
    navigation.navigate('EcoIdFailedScreen', {
      title: 'features.ecoId.ecoIdPaymentScreen.failed.header',
      message: message
        ? undefined
        : 'features.ecoId.ecoIdPaymentScreen.failed.body',
      customMessage: i18n.t(
        'features.ecoId.ecoIdPaymentScreen.failed.bodyWithMessage',
        {
          message,
          orderRef,
        },
      ),
      button: 'features.ecoId.ecoIdPaymentScreen.failed.contactUs',
    });
  }

  function onBackPress() {
    DialogManager.showConfirmDialog({
      confirmTitle: i18n.t('actions.yes'),
      returnTitle: i18n.t('actions.no'),
      title: i18n.t('features.ecoId.ecoIdPaymentScreen.confirmDiscardMessage'),
      onConfirmPress: () => navigation.goBack(),
      confirmColor: applicationColors.semantic.error.shade500,
    });
  }

  // Detect the success and failed event when webview starts to load new url
  function onShouldStartLoadWithRequest(event: WebViewNavigation): boolean {
    const url = event.mainDocumentURL || event.url; // ios is using `mainDocumentURL`, but android using `url`
    if (url.startsWith('ecoone://household')) {
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
          uri: paymentUri,
        }}
        originWhitelist={['ecoone://household', 'https://', 'http://']}
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

export function getFailedMessage(
  url: string,
  language: LanguageType,
): (string | null)[] {
  const urlParams = queryString.parse(url);
  let { message } = urlParams;
  if (urlParams.message && urlParams.message.includes('-')) {
    const messages = urlParams.message.toString().split('-');
    const [vn, en] = messages;
    if (language === 'en') {
      message = en;
    } else {
      message = vn;
    }
  }
  // @ts-ignore
  return [message, urlParams.order_ref];
}
