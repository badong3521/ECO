import React from 'react';
import { LayoutChangeEvent, TextStyle } from 'react-native';
import { Text as RText } from 'react-native-paper';
import styles from './style.css';
import { applicationMaxFontSizeMultiplier } from '../../../style.css';

export interface TextPropType {
  children: string | string[] | React.ReactNode[]; // Text can have some another Text component inside
  fontSize?: 'tiny' | 'small' | 'large'; // Normal is assumed no fontSize
  style?: TextStyle | TextStyle[]; // Allow styling of Text but prioritize own styles
  bold?: 'semiBold' | 'bold';
  color?: 'black' | 'darkGrey' | 'darkGreyV2' | 'grey' | 'white' | 'disabled';
  italic?: boolean;
  numberOfLines?: number;
  onPress?: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onTextLayout?: (event: any) => void;
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
  maxFontSizeMultiplier?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

// NOTE: Avoid styling component if possible expect with layout styles!
// High level component for all text in the app which gives it the same styling
export default function Text(props: TextPropType) {
  const {
    children,
    fontSize,
    style,
    bold,
    italic,
    numberOfLines,
    onPress,
    onLayout,
    onTextLayout,
    adjustsFontSizeToFit,
    color,
    allowFontScaling,
    maxFontSizeMultiplier,
    ellipsizeMode,
  } = props;

  return (
    <RText
      style={[
        styles.text,
        bold ? styles[bold] : null,
        fontSize ? styles[fontSize] : null,
        italic ? styles.italic : null,
        {
          textDecorationLine: onPress ? 'underline' : null,
        },
        color ? styles[color] : null,
        style,
      ]}
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      onPress={onPress}
      onLayout={onLayout}
      ellipsizeMode={ellipsizeMode}
      // @ts-ignore
      onTextLayout={onTextLayout}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
    >
      {children}
    </RText>
  );
}

Text.defaultProps = {
  italic: false,
  maxFontSizeMultiplier: applicationMaxFontSizeMultiplier,
};
