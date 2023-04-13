import React, { useEffect, useState } from 'react';
import { Button as RButton, ActivityIndicator } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { TextStyle, View, ViewStyle } from 'react-native';
import styles, { loadingColors } from './style.css';

import Firebase, { EventIdType, EventParams } from '../../services/firebase';

const DoneAnimation = require('../../assets/animation/done_animation.json');

export interface ButtonPropTypes {
  type: 'primary' | 'secondary' | 'text' | 'clear' | 'secondary2';
  title: string;
  onPress?: () => void;
  fontColor?: 'dark' | 'light';
  loading?: boolean;
  icon?: (() => React.ReactNode) | string;
  style?: ViewStyle | ViewStyle[];
  uppercase?: boolean;
  color?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  disable?: boolean;
  showSuccessAnimation?: boolean; // show animation icon with checkmark when loading = false
  onSuccessAnimationFinish?: () => void; // return this function when success icon is finished animating
  eventId?: EventIdType; // push this event to firebase tracking when onPress is called
  eventParams?: EventParams; // more data of the event
}

// High level button component to force same look throughout app
export default function Button(props: ButtonPropTypes) {
  const {
    type,
    title,
    onPress,
    fontColor,
    loading,
    icon,
    style,
    uppercase,
    color,
    containerStyle,
    labelStyle,
    disable,
    showSuccessAnimation,
    onSuccessAnimationFinish,
    eventId,
    eventParams,
  } = props;
  const lottieRef = React.createRef<LottieView>();
  const [animating, setAnimating] = useState<boolean>(false);

  // the title will be disappeared when loading and animating
  // return some space for title when loading to avoid button's height change
  function getTitle() {
    return animating || loading ? ' ' : title;
  }

  function onAnimateFinish() {
    setAnimating(false);
    if (onSuccessAnimationFinish) {
      onSuccessAnimationFinish();
    }
  }

  // render loading view and an animation icon with checkmark
  function renderLoadingAndSuccessAnimation(): React.ReactNode | undefined {
    if (loading || animating) {
      return (
        <View style={[styles.loadingContainer, style]}>
          {loading && <ActivityIndicator color={loadingColors[type]} />}
          {animating && (
            <LottieView
              ref={lottieRef}
              source={DoneAnimation}
              loop={false}
              style={styles.lottie}
              duration={1300}
              progress={1}
              colorFilters={successIconColorFilters(loadingColors[type])}
              onAnimationFinish={onAnimateFinish}
            />
          )}
        </View>
      );
    }
    return undefined;
  }

  useEffect(() => {
    if (animating) {
      lottieRef.current?.play();
    }
  }, [animating]);

  // is loading = false and showSuccessAnimation = true, run success animation icon
  useEffect(() => {
    if (loading === false && showSuccessAnimation) {
      setAnimating(true);
    }
  }, [loading]);

  function onPressCallback() {
    if (onPress) {
      onPress();
    }
    if (eventId) {
      Firebase.track(eventId, eventParams);
    }
  }

  return (
    <View style={containerStyle}>
      {type === 'primary' && (
        <RButton
          onPress={disable ? undefined : onPressCallback}
          mode="contained"
          style={[
            styles.button,
            styles.primary,
            style,
            disable ? styles.primaryDisabled : undefined,
          ]}
          labelStyle={[styles.labelStyle, styles.lightTitle, labelStyle]}
          disabled={loading}
          icon={icon}
          uppercase={uppercase}
          color={color}
          dark
        >
          {getTitle()}
        </RButton>
      )}
      {type === 'secondary' && (
        <RButton
          onPress={onPressCallback}
          mode="contained"
          style={[styles.button, styles.secondary, style]}
          labelStyle={[
            styles.labelStyle,
            styles.darkTitle,
            styles.secondaryLabel,
            labelStyle,
          ]}
          disabled={loading}
          icon={
            animating || (loading && showSuccessAnimation) ? undefined : icon
          }
          uppercase={uppercase}
          color={color}
        >
          {getTitle()}
        </RButton>
      )}
      {type === 'text' && (
        <RButton
          onPress={onPressCallback}
          mode="text"
          style={[styles.button, style]}
          labelStyle={[
            styles.labelStyle,
            fontColor === 'dark' ? styles.softDarkTitle : styles.softLightTitle,
            labelStyle,
          ]}
          disabled={loading}
          icon={icon}
          uppercase={uppercase}
          color={color}
        >
          {getTitle()}
        </RButton>
      )}
      {type === 'clear' && (
        <RButton
          onPress={onPressCallback}
          mode="outlined"
          style={[styles.button, style]}
          labelStyle={[
            styles.labelStyle,
            styles.clearLabel,
            fontColor === 'dark' ? styles.softDarkTitle : styles.softLightTitle,
            labelStyle,
          ]}
          disabled={loading}
          icon={loading || animating ? undefined : icon}
          uppercase={uppercase}
          color={color}
        >
          {getTitle()}
        </RButton>
      )}
      {type === 'secondary2' && (
        <RButton
          onPress={onPressCallback}
          mode="contained"
          style={[styles.button, styles.secondary2, style]}
          labelStyle={[
            styles.labelStyle,
            styles.darkTitle,
            styles.secondary2Label,
            labelStyle,
          ]}
          disabled={loading}
          icon={
            animating || (loading && showSuccessAnimation) ? undefined : icon
          }
          uppercase={uppercase}
          color={color}
        >
          {getTitle()}
        </RButton>
      )}
      {renderLoadingAndSuccessAnimation()}
    </View>
  );
}

function successIconColorFilters(color: string) {
  return [
    {
      keypath: 'checkmark',
      color,
    },
    {
      keypath: 'circle_2',
      color,
    },
    {
      keypath: 'circle_1',
      color,
    },
  ];
}
