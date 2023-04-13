import { Alert, Platform, BackHandler } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import JailMonkey from 'jail-monkey';

export default function checkIsJailbroken(
  title: string,
  message: string,
  cancelText: string,
  okText: string,
) {
  const isAndroid = Platform.OS === 'android';

  // JailMonkey only work with Android version >= 21
  if (isAndroid && Platform.Version < 21) {
    return;
  }

  if (JailMonkey.isJailBroken()) {
    Alert.alert(title, message, [
      {
        text: cancelText,
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
        text: okText,
        onPress: () => {},
      },
    ]);
  }
}
