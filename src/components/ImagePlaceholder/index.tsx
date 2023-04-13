import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import React from 'react';
import styles from './style.css';

const PLACEHOLDER_BACKGROUND = require('../../assets/animation/placeholder_background.json');

export default function ImagePlaceholder() {
  return (
    <View style={styles.container}>
      <LottieView
        source={PLACEHOLDER_BACKGROUND}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}
