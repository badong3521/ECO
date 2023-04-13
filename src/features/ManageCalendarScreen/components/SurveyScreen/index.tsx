import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import { DetailHandoverAppartmentType } from 'features/Csm/types';
import WebView, { WebViewNavigation } from 'react-native-webview';
import CSMApi from 'services/api/csm';
import Loader from 'components/Loader';
import styles from './style.css';
import Header from '../Header';

interface PropTypes {
  navigation: any;
}
const csmApi = new CSMApi();

const SurveyScreen = ({ navigation }: PropTypes) => {
  const detailHandover = navigation.getParam(
    'detailHandover',
  ) as DetailHandoverAppartmentType;

  const { locationCode, id } = detailHandover || {};

  const [loading, setLoading] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    const fetchLinkSurvey = async () => {
      setLoading(true);
      const res = await csmApi.fetchLinkSurvey(id);
      if (res.status === 'success') {
        const { data } = res.result;
        if (data.link) {
          setLink(data.link);
        }
      } else {
        setLink('');
      }
      setLoading(false);
    };
    fetchLinkSurvey();
  }, []);

  // Detect the success and failed event when webview starts to load new url
  const onShouldStartLoadWithRequest = (event: WebViewNavigation): boolean => {
    if (checkFormFinished(event.mainDocumentURL || event.url)) {
      navigateToSuccessScreen();
      return false;
    }
    return true;
  };

  // onShouldStartLoadWithRequest not work in google doc forms in Android
  const onNavigationStateChange = (navState: WebViewNavigation) => {
    if (Platform.OS === 'android' && checkFormFinished(navState.url)) {
      navigateToSuccessScreen();
    }
  };

  const checkFormFinished = (url: string) => url.indexOf('formResponse') > 0;

  const navigateToSuccessScreen = () => {
    navigation.replace('OrderSuccessScreen', {
      sendEmail: true,
      id,
    });
  };

  return (
    <View style={styles.container}>
      <Header title={`Phiếu khảo sát về công tác bàn giao ${locationCode}`} />
      {link ? (
        <WebView
          source={{
            uri: link,
          }}
          onLoadEnd={() => setLoading(false)}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled
        />
      ) : null}
      {loading && <Loader style={styles.loading} />}
    </View>
  );
};

export default SurveyScreen;
