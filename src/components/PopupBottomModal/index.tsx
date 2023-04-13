import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import styles from './style.css';

const screenHeight = Dimensions.get('screen').height;

interface PopupBottomModalType {
  onClose?: () => void;
  children: React.ReactNode;
  visible: boolean;
  style?: ViewStyle;
}

// High level component that can pop up a modal from the bottom of the screen.
// You can render content inside it using the "renderItem" prop.
export default function PopupBottomModal(props: PopupBottomModalType) {
  const { children, visible, style } = props;
  // Setup animation
  const animation = new Animated.Value(0);

  const handleOpen = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.sin,
    }).start();
  };

  // Animations
  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, -screenHeight],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.03],
          outputRange: [screenHeight * 2, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 0.2],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  // If component gets rendered as visible - show it
  useEffect(() => {
    if (visible) {
      handleOpen();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0.4)"
        translucent
      />
      <Animated.View style={[styles.cover, backdrop]}>
        <View style={styles.sheet}>
          <Animated.View style={[styles.popup, style, slideUp]}>
            {children}
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
}
