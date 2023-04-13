import { Animated, View, ViewStyle } from 'react-native';
import React from 'react';
import styles from './style.css';
import { applicationColors } from '../../../style.css';

interface DashedLineProps {
  interpolate?: any;
  type?: 'bottom' | 'top';
  style?: ViewStyle;
  color?: string;
  backgroundColor?: string;
}

// Dashed line use for CardDescriptionPromotion
// Can set interpolate to animate color
export default function DashedLine(props: DashedLineProps) {
  const { interpolate, type, style, color, backgroundColor } = props;
  return (
    <View style={style}>
      <Animated.View
        style={[
          styles.dash,
          {
            borderColor:
              interpolate || color || applicationColors.neutral.shade200,
          },
        ]}
      />
      {type === 'bottom' && (
        <View style={[styles.hideAbove, { backgroundColor }]} />
      )}
      {type === 'top' && (
        <View style={[styles.hideBellow, { backgroundColor }]} />
      )}
    </View>
  );
}
