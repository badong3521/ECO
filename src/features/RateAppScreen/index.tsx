import React, { useEffect, useState } from 'react';
import { Slider } from 'react-native-elements';
import Svg, {
  Circle,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {
  interpolateColor,
  interpolatePath,
  useValue,
} from 'react-native-redash';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import {
  View,
  Keyboard,
  KeyboardEvent,
  Animated as RAnimated,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { applicationColors, applicationDimensions } from '../../../style.css';
import Heading from '../../components/Heading';
import TouchableComponent from '../../components/TouchableComponent';
import Text from '../../components/Text';
import Loader from '../../components/Loader';
import styles from './style.css';
import UserApi from '../../services/api/user';
import IconButton from '../../components/IconButton';

interface PropTypes {
  navigation: any;
}

const emoji = require('../../assets/images/rate-app.png');

const ANIMATION_DURATION = 250;
const IMAGE_SMALL_SCALE = 0.6;
const MARGIN_BOTTOM = 30;
const INPUT_HEIGHT = Dimensions.get('screen').height * 0.13;
const INPUT_MARGIN_TOP = Dimensions.get('screen').height * 0.045;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const d2 = `
  M 60 120 
  C 75 140
    105 140
    120 120
`;
const d1 = `
  M 60 140 
  C 75 120 
    105 120
    120 140
`;

export default function RateAppScreen(props: PropTypes) {
  const { navigation } = props;
  const value = useValue(2);
  const imageScale = useValue(1);
  const keyboardHeight = useValue(MARGIN_BOTTOM);
  const inputHeight = useValue(50);
  const d = interpolatePath(value, {
    inputRange: [0, 2],
    outputRange: [d1, d2],
  });
  const backgroundColor = interpolateColor(value, {
    inputRange: [0, 1, 2],
    outputRange: ['#FBD2AC', '#94D0FC', '#9AEAC3'],
  });
  const leftEyeX = interpolate(value, {
    inputRange: [0, 1, 2],
    outputRange: [55.2973, 45.2973, 59.1891],
  });
  const rightEyeX = interpolateColor(value, {
    inputRange: [0, 1, 2],
    outputRange: [121.297, 113.297, 125.27],
  });
  const eyeY = interpolate(value, {
    inputRange: [0, 1, 2],
    outputRange: [85.2972, 78.2972, 74.5948],
  });
  const { t } = useTranslation();
  const userApi = new UserApi();
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(2);

  function onKeyboardShow(e: KeyboardEvent) {
    setKeyboardVisible(true);
    RAnimated.parallel([
      Animated.timing(imageScale, {
        toValue: IMAGE_SMALL_SCALE,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(inputHeight, {
        toValue: INPUT_HEIGHT,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      }),
    ]).start();
  }

  function onKeyboardHide() {
    setKeyboardVisible(false);
    RAnimated.parallel([
      Animated.timing(imageScale, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(keyboardHeight, {
        toValue: MARGIN_BOTTOM,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(inputHeight, {
        toValue: 50,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      }),
    ]).start();
  }

  async function rateApp() {
    setLoading(true);
    const res = await userApi.rateApp({
      score: rating + 1,
      comment: feedback,
    });
    setLoading(false);
    if (res.status === 'success') {
      navigation.goBack();
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardHide);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={[
          styles.root,
          {
            backgroundColor,
          },
        ]}
      >
        <Animated.View style={styles.imageContainer}>
          <Animated.View
            style={{
              transform: [{ scale: imageScale }],
              marginTop: interpolate(imageScale, {
                inputRange: [IMAGE_SMALL_SCALE, 1],
                outputRange: [
                  applicationDimensions.defaultPadding,
                  applicationDimensions.defaultPadding + 30,
                ],
              }),
            }}
          >
            <Heading size="h3" bold="bold" style={styles.label}>
              {
                t('features.rateAppScreen.title', { returnObjects: true })[
                  rating
                ]
              }
            </Heading>
          </Animated.View>

          <Animated.View
            style={{
              marginTop: interpolate(imageScale, {
                inputRange: [IMAGE_SMALL_SCALE, 1],
                outputRange: [-25, 70],
              }),
              marginBottom: interpolate(imageScale, {
                inputRange: [IMAGE_SMALL_SCALE, 1],
                outputRange: [-25, INPUT_MARGIN_TOP],
              }),
              transform: [{ scale: imageScale }],
            }}
          >
            <FastImage source={emoji} style={styles.emoji} resizeMode="cover" />
            <Svg style={styles.svg} viewBox="0 0 180 231" fill="none">
              <G>
                <AnimatedPath
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...{ d }}
                  stroke="url(#paint1_linear)"
                  strokeWidth={8}
                  strokeLinecap="round"
                />
              </G>
              <AnimatedCircle r="7.2973" cx={leftEyeX} cy={eyeY} fill="white" />
              <AnimatedCircle
                r="7.2973"
                cx={rightEyeX}
                cy={eyeY}
                fill="white"
              />
              <Defs>
                <LinearGradient
                  id="paint1_linear"
                  x1="90"
                  y1="123.998"
                  x2="90.0179"
                  y2="139.082"
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop stopColor="#F68720" />
                  <Stop offset="1" stopColor="#FA7169" />
                </LinearGradient>
              </Defs>
            </Svg>
          </Animated.View>
          <Slider
            allowTouchTrack
            onSlidingComplete={(e: number) => {
              Animated.timing(value, {
                duration: ANIMATION_DURATION,
                toValue: e,
                easing: Easing.in(Easing.ease),
              }).start();
              setRating(e);
            }}
            step={1}
            minimumTrackTintColor={applicationColors.neutral.shade100}
            maximumTrackTintColor="rgba(255, 255, 255, 0.35)"
            value={rating}
            maximumValue={2}
            minimumValue={0}
            style={{ width: '66%' }}
            thumbStyle={styles.sliderThumb}
            thumbTintColor={applicationColors.neutral.shade100}
            trackStyle={styles.sliderTrack}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.textInputContainer,
            {
              marginTop: interpolate(imageScale, {
                inputRange: [IMAGE_SMALL_SCALE, 1],
                outputRange: [20, INPUT_MARGIN_TOP],
              }),
            },
          ]}
        >
          <Animated.View
            style={[
              styles.textInput,
              {
                backgroundColor: interpolateColor(imageScale, {
                  inputRange: [IMAGE_SMALL_SCALE, 1],
                  outputRange: ['rgba(255,255,255,1)', 'rgba(255,255,255,0.2)'],
                }),
                height: feedback.length > 0 ? INPUT_HEIGHT : inputHeight,
                justifyContent:
                  keyboardVisible || feedback.length > 0
                    ? 'flex-start'
                    : 'center',
              },
            ]}
          >
            <TextInput
              multiline
              placeholderTextColor={applicationColors.neutral.shade500}
              onChangeText={(text: string) => setFeedback(text)}
              value={feedback}
              placeholder={
                t('features.rateAppScreen.subtitle', { returnObjects: true })[
                  rating
                ]
              }
            />
          </Animated.View>
        </Animated.View>
        <IconButton
          style={styles.closeButton}
          type="circle"
          onPress={() => navigation.goBack()}
          iconColor={applicationColors.semantic.error.shade500}
          iconSize={12}
          iconName="close"
          padding={0}
        />
        <TouchableComponent
          disabled={feedback.length === 0 || loading}
          onPress={() => {
            Keyboard.dismiss();
            rateApp();
          }}
        >
          <View style={styles.button}>
            {loading ? (
              <Loader />
            ) : (
              <Text
                bold="bold"
                style={{
                  color:
                    feedback.length === 0
                      ? applicationColors.neutral.shade300
                      : applicationColors.primary.shade900,
                }}
              >
                {t('actions.submit')}
              </Text>
            )}
          </View>
        </TouchableComponent>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
