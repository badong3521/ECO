import WebView from 'react-native-webview';
import React from 'react';
import Config from 'react-native-config';
import { useUserState } from '../../../User/reducers';
import CamelCaseConverter from '../../../../services/camelCaseConverter';

interface AppleSignInScreenProps {
  navigation: any;
}

export default function AppleSignInScreen(props: AppleSignInScreenProps) {
  const [, userActions] = useUserState();
  const { navigation } = props;
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.stringify(document.body.children[0].innerHTML));
   })();`;

  function onMessage(event: any) {
    try {
      const res = event.nativeEvent.data;
      const firstParse = JSON.parse(res);
      const parsedData = CamelCaseConverter.convertKeys(
        'camel',
        JSON.parse(firstParse),
      );
      if ('data' in parsedData && 'token' in parsedData.data) {
        const { status, token } = parsedData.data;
        userActions.setSignedInWithThirdParties(true);
        userActions.setUser(parsedData.data);
        userActions.setToken(token);
        navigation.goBack();
        if (status === 'inactive') {
          navigation.navigate('AddPhoneNumber');
        } else {
          navigation.navigate('App');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <WebView
      source={{
        uri: `${Config.API_BASE_URL}/users/auth/apple?client_id=${Config.ECOONE_CLIENT_ID}`,
      }}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={event => onMessage(event)}
      onError={event => console.log('onErr', event)}
    />
  );
}
