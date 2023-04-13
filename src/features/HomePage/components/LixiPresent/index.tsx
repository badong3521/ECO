import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import OneMillionSvg from '../../../../assets/lixi/1million.svg';
import Text from '../../../../components/Text';
import CountdownTime from './CountdownTime';
import styles from './style.css';
import navigationService from '../../../../services/navigationService';
import LixiTotal from './LixiTotal';
import { applicationDimensions } from '../../../../../style.css';
import { useUserState } from '../../../User/reducers';

const CLOSED_LIXI_BACKGROUND = require('../../../../assets/lixi/closed_lixi_background.png');
const OPEN_LIXI_BACKGROUND = require('../../../../assets/lixi/open_lixi_background.png');

interface LixiPresentProps {
  canPlay: boolean;
  countdown: number;
  lixiTotal: number;
  onReloadLixi: () => void;
}
export default function LixiPresent(props: LixiPresentProps) {
  const { canPlay, countdown, onReloadLixi, lixiTotal } = props;
  const i18n = useTranslation();
  const [, userActions] = useUserState();
  const [contentWidth, setContentWidth] = useState<number>(0);
  const contentPaddingRight = getMaxContentWidth(canPlay) - contentWidth;
  function onPress() {
    if (canPlay) {
      navigationService.navigate('LixiOnboardingScreen');
    }
  }

  function onLixiTotoPress() {
    userActions.setShouldRefreshBookmarks(true);
    navigationService.navigate('BookmarkScreen');
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <View style={styles.container}>
          <FastImage
            source={canPlay ? OPEN_LIXI_BACKGROUND : CLOSED_LIXI_BACKGROUND}
            style={styles.background}
          />
          <View
            style={[
              styles.content,
              {
                right: contentPaddingRight,
              },
            ]}
            onLayout={event => {
              setContentWidth(event.nativeEvent.layout.width);
            }}
          >
            <Text bold="bold" style={styles.text} allowFontScaling={false}>
              {canPlay
                ? i18n.t('features.home.lixi.title')
                : i18n.t('features.home.lixi.closingTitle')}
            </Text>
            <Text
              fontSize="small"
              style={[styles.text, styles.totalPrize]}
              allowFontScaling={false}
            >
              {i18n.t('features.home.lixi.totalPrize')}
            </Text>
            <OneMillionSvg style={styles.oneMillion} />
            {!canPlay && (
              <View style={styles.closedCountdown}>
                <Text
                  fontSize="small"
                  style={[styles.text, styles.openFromText]}
                  allowFontScaling={false}
                >
                  {i18n.t('features.home.lixi.openFrom')}
                </Text>
                <CountdownTime
                  isDetail={false}
                  remainTime={countdown}
                  onTimeout={onReloadLixi}
                />
              </View>
            )}
          </View>
          {canPlay && (
            <View style={styles.openCountdown}>
              <Text
                fontSize="tiny"
                style={[styles.text]}
                allowFontScaling={false}
              >
                {i18n.t('features.home.lixi.timeRemainingToOpen')}
              </Text>
              <CountdownTime
                isDetail
                remainTime={countdown}
                onTimeout={onReloadLixi}
              />
            </View>
          )}
        </View>
        {!!lixiTotal && lixiTotal > 0 && (
          <LixiTotal i18n={i18n} total={lixiTotal} onPress={onLixiTotoPress} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

function getMaxContentWidth(canPlay: boolean): number {
  const scale = canPlay ? 0.86 : 0.82;
  return (
    Dimensions.get('screen').width * scale -
    applicationDimensions.defaultPadding * 2
  );
}
