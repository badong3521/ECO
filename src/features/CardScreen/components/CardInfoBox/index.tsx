import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from './style.css';

interface CardInfoBox {
  children: React.ReactNode | React.ReactNode[];
  style?: ViewStyle;
}

// Render a box that slightly overlays the top image
export default function CardInfoBox(props: CardInfoBox) {
  const { children, style } = props;

  return <View style={[styles.container, style]}>{children}</View>;
}
