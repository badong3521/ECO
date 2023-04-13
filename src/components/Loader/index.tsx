import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import { applicationColors } from '../../../style.css';

interface LoaderProps {
  color?: string;
  visible?: boolean;
  style?: ViewStyle;
  size?: 'small' | 'large' | number;
}

// Render a loader
export default function Loader(props: LoaderProps) {
  const {
    color = applicationColors.primary.shade900,
    visible,
    style,
    size,
  } = props;
  return visible ? (
    <ActivityIndicator color={color} style={style} size={size} />
  ) : null;
}

Loader.defaultProps = {
  visible: true,
};
