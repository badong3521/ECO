import { Alert, Platform, BackHandler } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import JailMonkey from 'jail-monkey';
import { useTranslation } from 'react-i18next';

function useNoticeJailbreak() {
  const i18n = useTranslation();

  function onNoticeJailbreak() {
    const isAndroid = Platform.OS === 'android';
    if (JailMonkey.isJailBroken()) {
      Alert.alert(
        i18n.t('components.noticeJailbreak.title'),
        i18n.t('components.noticeJailbreak.message'),
        [
          {
            text: i18n.t('components.noticeJailbreak.exitApp'),
            onPress: () => {
              if (isAndroid) {
                BackHandler.exitApp();
              } else {
                RNExitApp.exitApp();
              }
            },
            style: 'cancel',
          },
          {
            text: i18n.t('components.noticeJailbreak.continue'),
            onPress: () => {},
          },
        ],
      );
    }
  }

  return {
    onNoticeJailbreak,
  };
}

export default useNoticeJailbreak;
