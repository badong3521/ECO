import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  View,
  Vibration,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import Text from '../../../../components/Text';
import CoinRaining from './components/CoinRaning';
import styles from './style.css';
import useOnShaking from '../../../../utils/hooks/useOnShaking';
import TouchableComponent from '../../../../components/TouchableComponent';
import LixiApi from '../../../../services/api/lixi';
import useStatusBar from '../../../../utils/hooks/useStatusBar';

const BACKGROUND = require('../../../../assets/lixi/background.png');
const SLOGAN = require('../../../../assets/lixi/slogan.png');
const CLOSED_GIFT = require('../../../../assets/lixi/closed_gift.png');
const OPENED_GIFT = require('../../../../assets/lixi/open_gift.png');

const shakeDuration = 85;
const FastImageAnimated = Animated.createAnimatedComponent(FastImage);
const shakeEasing = Easing.ease;
const vibration = Platform.OS === 'ios' ? [0, 0.5, 0.2, 0.5] : [0, 1000];
const shakeDistances = [-10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0];

const lixiApi = new LixiApi();
let isShaking = false;

interface LixiOnboardingScreenProps {
  navigation: any;
}
export default function LixiOnboardingScreen(props: LixiOnboardingScreenProps) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);
  const [raining, setRaining] = useState<boolean>(false);
  const shakeAnimation = useRef(new Animated.Value(0));
  const openAnimation = useRef(new Animated.Value(0.3));

  async function getLixi() {
    const res = await lixiApi.getLixi();
    if (res.status === 'success') {
      navigation.replace('GotALixiScreen', {
        card: res.result.data,
      });
    } else {
      navigation.replace('GotALixiScreen');
    }
  }

  function shaking() {
    if (isShaking) return;
    isShaking = true;
    Vibration.vibrate(vibration);
    Animated.sequence(
      shakeDistances.map(value =>
        Animated.timing(shakeAnimation.current, {
          toValue: value,
          duration: shakeDuration,
          useNativeDriver: true,
          easing: shakeEasing,
        }),
      ),
    ).start(finished => {
      isShaking = false;
      if (finished) {
        setOpened(!opened);
      }
    });
  }

  useEffect(() => {
    if (opened) {
      Animated.timing(openAnimation.current, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }).start(({ finished }) => {
        if (finished) {
          setTimeout(() => {
            getLixi();
          }, 1000);
        }
      });
      setTimeout(() => {
        setRaining(true);
      }, 100);
    } else {
      setRaining(false);
    }
  }, [opened]);

  useOnShaking(() => {
    shaking();
  });

  useStatusBar('light-content');

  return (
    <View style={styles.root}>
      <FastImage source={BACKGROUND} style={styles.background} />
      <FastImage source={SLOGAN} style={styles.slogan} />
      <TouchableWithoutFeedback
        onPress={() => {
          if (!opened) {
            shaking();
          }
        }}
      >
        {opened ? (
          <FastImageAnimated
            source={OPENED_GIFT}
            style={[
              styles.openGift,
              {
                transform: [
                  {
                    scale: openAnimation.current,
                  },
                ],
              },
            ]}
          />
        ) : (
          <View>
            <FastImageAnimated
              source={CLOSED_GIFT}
              style={[
                styles.closeGift,
                {
                  transform: [
                    {
                      translateX: shakeAnimation.current,
                    },
                    {
                      rotate: shakeAnimation.current.interpolate({
                        inputRange: [-10, 0, 10],
                        outputRange: ['-0.1rad', '0rad', '0.1rad'],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
            <Text style={styles.description} bold="bold">
              {i18n.t('features.lixiOnboarding.description')}
            </Text>
          </View>
        )}
      </TouchableWithoutFeedback>
      <CoinRaining enable={raining} />
      <TouchableComponent
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.closed}>
          <Text style={styles.closedText} bold="bold">
            {i18n.t('actions.close')}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
}
