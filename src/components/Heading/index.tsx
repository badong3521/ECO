import React from 'react';
import { TextStyle } from 'react-native';
import { Title as RTitle } from 'react-native-paper';
import styles from './style.css';
import { applicationMaxFontSizeMultiplier } from '../../../style.css';

interface HeadingPropType {
  children: string;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'; // No size is assumed h1
  style?: TextStyle | TextStyle[]; // Allow styling of Text but prioritize own styles
  bold?: 'semiBold' | 'bold';
  numberOfLines?: number;
  allowFontScaling?: boolean;
  maxFontSizeMultiplier?: number;
}

// NOTE: Avoid styling component if possible expect with layout styles!
// High level component for all headings in the app which gives it the same styling
export default function Heading(props: HeadingPropType) {
  const {
    children,
    size,
    style,
    numberOfLines,
    bold,
    allowFontScaling,
    maxFontSizeMultiplier,
  } = props;

  return (
    <RTitle
      style={[
        style,
        styles.heading,
        bold ? styles[bold] : null,
        size ? styles[size] : styles.h1,
      ]}
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
    >
      {children}
    </RTitle>
  );
}

Heading.defaultProps = {
  maxFontSizeMultiplier: applicationMaxFontSizeMultiplier,
};
