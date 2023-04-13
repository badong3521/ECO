import React from 'react';
import { View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styles from './style.css';

const BLUR_CIRCLE = require('../../../../assets/home/blur_circle.png');

interface HomeBackgroundProps {
  style?: ViewStyle;
}
export default function HomeBackground(props: HomeBackgroundProps) {
  const { style } = props;
  return (
    <View style={[styles.background, style]}>
      <LinearGradient
        colors={['#92E4C7', '#38BF9E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        angle={45}
        style={styles.gradient}
      />

      <LinearGradient
        colors={['white', 'white']}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 0, y: 1 }}
        angle={45}
        style={styles.circle}
      />

      <LinearGradient
        colors={['white', 'white']}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 0, y: 1 }}
        angle={45}
        style={styles.circle2}
      />

      <FastImage source={BLUR_CIRCLE} style={styles.blurCircle} />
    </View>
  );
}
