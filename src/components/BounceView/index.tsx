import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import TouchableComponent from '../TouchableComponent';

const duration = 120;
interface Props {
  pressedScale: number;
  children: React.ReactNode | React.ReactNode[];
  style?: ViewStyle;
  onPress?: () => void;
}

// Animating when view is pressing
export default function BounceView(props: Props) {
  const { pressedScale, children, style, onPress } = props;
  const pinchAnimate = new Animated.Value(1);

  function onTouchStart() {
    Animated.timing(pinchAnimate, {
      toValue: pressedScale,
      duration,
    }).start();
  }

  function onTouchEnd() {
    Animated.timing(pinchAnimate, {
      toValue: 1,
      duration,
    }).start();
  }

  return (
    <Animated.View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      style={[
        {
          transform: [
            {
              scale: pinchAnimate,
            },
          ],
        },
        style,
      ]}
    >
      {onPress ? (
        <TouchableComponent onPress={onPress}>{children}</TouchableComponent>
      ) : (
        children
      )}
    </Animated.View>
  );
}
