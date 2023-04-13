import { View, ViewStyle } from 'react-native';
import * as React from 'react';
import styles from './style.css';

interface SearchBarIndicatorsProps {
  style?: ViewStyle;
}

// Show a line and 2 indicators to connect 2 SearchBars
export default function SearchBarIndicators(props: SearchBarIndicatorsProps) {
  const { style } = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.fromPoint} />
      <View style={styles.connectLine} />
      <View style={styles.toPoint} />
    </View>
  );
}
