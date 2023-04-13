import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { getStatusBarHeight } from 'utils/statusBar';
import WebView from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import HTMLView from '../../components/HTMLView';
import Text from '../../components/Text';
import useStatusBar, {
  updateStatusBarWhenScrolling,
} from '../../utils/hooks/useStatusBar';
import Badge from '../../components/Badge';
import Heading from '../../components/Heading';
import IconButton from '../../components/IconButton';
import Loader from '../../components/Loader';
import { useUserState } from '../User/reducers';
import Avatar from '../../components/Avatar';
import { Notification } from '../../services/api/types/notification';

import styles from './style.css';
import { applicationColors, applicationIcons } from '../../../style.css';

export default function AnnouncementScreen(props: any) {
  const { navigation } = props;
  const { notification } = navigation.state.params;
  const { userLanguage } = useUserState()[0];
  const i18n = useTranslation();
  const [webViewHeight, setWebViewHeight] = useState(10);

  const onWebViewMessage = (event: any) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  // update statusBar color when scrolling
  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    updateStatusBarWhenScrolling(event, {
      darkBoundary: 75 + getStatusBarHeight(),
    });
  }

  useStatusBar('light-content');

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            notification?.sender.color || applicationColors.neutral.shade500,
        },
      ]}
    >
      <View style={styles.backdrop} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <View style={styles.backButtonContainer}>
          <IconButton
            type="clear"
            iconName={applicationIcons.back}
            iconColor={applicationColors.primary.white}
            iconSize={24}
            onPress={() => {
              navigation.pop();
              navigation.navigate('NotificationScreen');
            }}
          />
          <View style={styles.contentContainer}>
            {/* This code was added to fix for bug on android https://github.com/facebook/react-native/issues/15826 */}
            <View style={styles.androidBackdropTopCorner} />
            <View style={styles.androidBackdropBottom} />
            {notification ? (
              <>
                <Avatar
                  size={75}
                  avatarUrl={notification.sender.logo}
                  style={styles.avatar}
                />

                <View style={styles.authorContainer}>
                  <Text bold="bold" fontSize="large" style={styles.author}>
                    {notification.sender.name[userLanguage]}
                  </Text>
                </View>
                <View style={styles.badgeContainer}>
                  <Badge
                    type="clear"
                    color={notification.sender.color}
                    text={i18n.t(
                      'features.notificationScreen.announcementBadge',
                    )}
                    textColor={applicationColors.primary.black}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.title}>
                    <Heading size="h1" bold="bold">
                      {notification.title[userLanguage]}
                    </Heading>
                    <Text bold="bold">{notification.body[userLanguage]}</Text>
                  </View>
                  <Text fontSize="tiny" style={styles.date}>
                    {moment(notification.createdAt).format(
                      'HH:mm - DD/MM/YYYY',
                    )}
                  </Text>

                  {(notification as Notification).origin === 'ems' ? (
                    <>
                      {Platform.OS === 'android' ? (
                        <WebView
                          source={{
                            html: parseEmsNotificationDetails(
                              notification.data[userLanguage],
                            ),
                          }}
                          injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
                          style={[styles.webview, { height: webViewHeight }]}
                          onMessage={onWebViewMessage}
                          originWhitelist={[]}
                          scrollEnabled={false}
                          scalesPageToFit={false}
                        />
                      ) : (
                        <AutoHeightWebView
                          source={{
                            html: parseEmsNotificationDetails(
                              notification.data[userLanguage],
                            ),
                          }}
                          scrollEnabled={false}
                          style={styles.webview}
                          originWhitelist={[]}
                        />
                      )}
                    </>
                  ) : (
                    <HTMLView
                      scrollable={false}
                      html={notification.data[userLanguage]}
                    />
                  )}
                </View>
              </>
            ) : (
              <Loader />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function parseEmsNotificationDetails(content: string) {
  return `<html><head><meta name="viewport" content="width=device-width" initial-scale=1 /><style>body{background-color: #F7F7F7;}</style></head><body>${content}</body></html>`;
}
