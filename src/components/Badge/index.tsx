import React from 'react';
import { View, ViewStyle } from 'react-native';
import Text from '../Text';
import styles from './style.css';
import { applicationColors } from '../../../style.css';

type BadgeType = 'clear' | 'fill';

interface BadgeProps {
  type: BadgeType;
  color: string;
  text: string;
  bold?: 'bold' | 'semiBold';
  textColor?: string;
  style?: ViewStyle;
}

export default function Badge(props: BadgeProps) {
  const { type, color, text, bold, style, textColor } = props;

  return (
    <>
      {type === 'clear' && (
        <View
          style={[
            styles.badge,
            styles.clear,
            {
              borderColor: color,
            },
            style,
          ]}
        >
          <Text
            fontSize="small"
            style={{ color: textColor || color }}
            bold={bold}
          >
            {text}
          </Text>
        </View>
      )}
      {type === 'fill' && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: color,
            },
            {
              borderColor: color,
            },
            style,
          ]}
        >
          <Text
            fontSize="tiny"
            style={{
              color: textColor || applicationColors.primary.white,
            }}
            bold={bold}
            numberOfLines={1}
          >
            {text}
          </Text>
        </View>
      )}
    </>
  );
}

Badge.defaultProps = {
  color: applicationColors.neutral.shade300,
  textColor: applicationColors.primary.white,
};
