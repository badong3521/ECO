import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Platform, StatusBar, StyleProp, ViewStyle } from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {
  NavigationParams,
  NavigationRoute,
  NavigationState,
} from 'react-navigation';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useTranslation } from 'react-i18next';
import { handleNotification } from '../../utils/notification';
import { useUserState } from '../../features/User/reducers';
import IconComponent, { IconProps } from '../Icon';
import {
  applicationColors,
  applicationStyle,
  applicationTheme,
} from '../../../style.css';
import AppNavigator from '../../navigation/app.navigator';
import NavigationService from '../../services/navigationService';
import UserApi from '../../services/api/user';
import MessageDialog, {
  MessageDialogRef,
} from '../Dialog/components/MessageDialog';
import ConfirmDialog, {
  ConfirmDialogRef,
} from '../Dialog/components/ConfirmDialog';
import DialogManager from '../Dialog/manager';
import Firebase from '../../services/firebase';
import LoadingDialog, {
  LoadingDialogRef,
} from '../Dialog/components/LoadingDialog';
import CardApi from '../../services/api/card';
import checkIsJailbroken from '../../utils/noticeJaibreak';

const PushNotification = require('react-native-push-notification');

import AuthorizationStatus = FirebaseMessagingTypes.AuthorizationStatus;

const userApi = new UserApi();

// Wrapping whole app
export default function AppContainer() {
  const [userState, userActions] = useUserState();
  const cardApi = new CardApi();
  const i18n = useTranslation();

  // create new instance for MessageDialog and ConfirmDialog
  // and save to the DialogManager, then can use it from everywhere in app
  // by call DialogManager.showMessageDialog(data) or DialogManager.showConfirmDialog(data)
  const messageRef = React.createRef<MessageDialogRef>();
  const confirmDialogRef = React.createRef<ConfirmDialogRef>();
  const loadingDialogRef = React.createRef<LoadingDialogRef>();

  useEffect(() => {
    checkIsJailbroken(
      i18n.t('components.noticeJailbreak.title'),
      i18n.t('components.noticeJailbreak.message'),
      i18n.t('components.noticeJailbreak.exitApp'),
      i18n.t('components.noticeJailbreak.continue'),
    );
  }, [i18n]);

  // setup selected langauge
  // request notification permission
  // it's required for IOS
  async function requestUserPermission() {
    const authStatus: AuthorizationStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      updateDeviceToken();
    }
  }

  // receive the notification when the app is on foreground
  // to show the local notification
  function onReceiveMessageForeground() {
    return messaging().onMessage(async remoteMessage => {
      console.log('onMessage', remoteMessage);
      showLocalNotification(remoteMessage);
    });
  }

  // get the notification when app is opened by click a notification
  async function checkInitialNotification() {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage && remoteMessage.data) {
      handleNotification(remoteMessage.data);
    }
  }

  // if user is logged in, call api to update device token
  // device token is needed to receive notification from backend
  async function updateDeviceToken() {
    const deviceToken = await messaging().getToken();
    console.log('TOKEN', deviceToken);
    if (userState.user) {
      await userApi.updateFcmDeviceToken();
    }
  }

  async function handleDynamicLink({ url }: { url: string }) {
    // Handle dynamic link inside your own application
    const cardId = getParameterByName('card_id', url);
    const cardType = getParameterByName('card_type', url);
    const screen = getParameterByName('screen', url);
    if (cardId) {
      NavigationService.navigate('CardScreen', {
        card: {
          id: cardId,
          type: cardType,
        },
      });
    }
    if (screen) {
      if (screen === 'merchant_category') {
        const categoryId = getParameterByName('category_id', url);
        const preselectedSubcategories = getParameterByName(
          'preselected_subcategories',
          url,
        )
          ?.trim()
          .split(',')
          .map(subcategory => parseInt(subcategory, 10));
        if (categoryId) {
          const res = await cardApi.fetchCategories();
          if (res.status === 'success') {
            const category = res.result.data.find(
              item => item.id === parseInt(categoryId, 10),
            );
            NavigationService.navigate('MerchantCategoryScreen', {
              category,
              preselectedSubcategories,
            });
          }
        }
      } else if (screen === 'schedule_handover') {
        NavigationService.navigate('ManageCalendarScreen');
      }
    }
  }

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) handleDynamicLink(link);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the is component unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  // setup selected langauge and notification
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = onReceiveMessageForeground();
    checkInitialNotification();
    setupLocalPushNotification();
    userActions.setUserLanguage(userState.userLanguage);
    return () => {
      unsubscribe();
    };
  }, []);

  // call api to update user's language
  useEffect(() => {
    if (userState.user) {
      userApi.updateUserProfile({
        userId: userState.user?.id as number,
        locale: userState.userLanguage,
      });
    }
  }, [userState.userLanguage]);

  // save messageDialog instance to DialogManager
  useEffect(() => {
    if (messageRef) {
      DialogManager.setMessageRef(messageRef);
    }
  }, [messageRef]);

  // save confirmDialog instance to DialogManager
  useEffect(() => {
    if (confirmDialogRef) {
      DialogManager.setConfirmDialogRef(confirmDialogRef);
    }
  }, [confirmDialogRef]);

  // save loadingDialog instance to DialogManager
  useEffect(() => {
    if (loadingDialogRef) {
      DialogManager.setLoadingDialogRef(loadingDialogRef);
    }
  }, [loadingDialogRef]);

  return (
    <PaperProvider
      settings={{
        icon: (props: IconProps) => {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <IconComponent {...props} />;
        },
      }}
      theme={applicationTheme}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppNavigator
        style={applicationStyle.body as StyleProp<ViewStyle>}
        ref={navigatorRef => {
          // @ts-ignore
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={(prevState, nextState) => {
          onChangeScreen(prevState, nextState);
        }}
      />
      <MessageDialog dialogRef={messageRef} />
      <ConfirmDialog dialogRef={confirmDialogRef} />
      <LoadingDialog dialogRef={loadingDialogRef} />
    </PaperProvider>
  );
}

// get the notification when app is in background
// no need to show the local notification because, in the background, the remote notification will be shown automatically
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('setBackgroundMessageHandler', remoteMessage);
});

function setupLocalPushNotification() {
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification(notification: any) {
      // if is IOS, only handle click of notification when remote is not true,
      // avoiding the case when onNotification right after notification is received.
      if (Platform.OS !== 'ios' || !notification.data?.remote) {
        let { data } = notification;
        // when app is in background, but click on notification in foreground, the data maybe is not in `data`
        if (Object.keys(data).length === 0) {
          data = notification;
        }
        handleNotification(data);
      }

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    requestPermissions: true,
  });
}

function showLocalNotification(message: any) {
  const { notification, data } = message;
  PushNotification.localNotification({
    message: notification.body || '',
    title: notification.title || '',
    largeIcon: '',
    color: applicationColors.primary.shade900,
    userInfo: { ...data },
  });
}

// track nextScreen and event when start new screen to firebase
function onChangeScreen(
  prevState: NavigationState,
  nextState: NavigationState,
) {
  const prevScreen = getCurrentRouteName(prevState);
  const currentScreen = getCurrentRouteName(nextState);
  if (currentScreen && currentScreen.routeName !== prevScreen?.routeName) {
    if (currentScreen.params?.eventId) {
      Firebase.track(
        currentScreen.params?.eventId,
        currentScreen.params?.eventParams,
      );
    }
    Firebase.setScreen(
      currentScreen.params?.eventScreenName || currentScreen.routeName,
    );
  }
}

// gets the current screen from navigation state
function getCurrentRouteName(
  navigationState: NavigationState,
): NavigationRoute<NavigationParams> | undefined {
  if (!navigationState) {
    return undefined;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route;
}

// https://stackoverflow.com/a/901144
function getParameterByName(name: string, url: string) {
  const parsedName = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
