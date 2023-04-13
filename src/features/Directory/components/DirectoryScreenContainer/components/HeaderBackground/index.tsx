import { Animated } from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'utils/statusBar';
import styles from '../../style.css';
import Greeting from '../../../../../../components/Greeting';
import { applicationColors } from '../../../../../../../style.css';

interface HeaderBackgroundProps {
  height: number;
  scrollValueRef?: React.MutableRefObject<Animated.Value>;
  background?: React.ReactNode;
  title?: string;
  subtitle?: string;
  textColor?: string;
}

// Contain background component, title and subtitle. This will be translate to top when scrolling
function HeaderBackground(props: HeaderBackgroundProps) {
  const {
    height,
    scrollValueRef,
    background,
    title,
    subtitle,
    textColor = applicationColors.neutral.shade900,
  } = props;
  return (
    <Animated.View
      style={[
        styles.background,
        {
          position: scrollValueRef ? 'absolute' : 'relative',
          height,
          transform: scrollValueRef
            ? [
                {
                  translateY: scrollValueRef.current.interpolate({
                    inputRange: [0, height],
                    outputRange: [0, -height],
                    extrapolate: 'clamp',
                  }),
                },
              ]
            : undefined,
        },
      ]}
    >
      {background}
      <Greeting
        color={textColor}
        title={title}
        subTitle={subtitle}
        style={[
          styles.greeting,
          {
            top: 50 + getStatusBarHeight(),
          },
        ]}
      />
    </Animated.View>
  );
}

export default React.memo(
  HeaderBackground,
  (prevProps, nextProps) =>
    prevProps.background === nextProps.background &&
    prevProps.height === nextProps.height,
);
