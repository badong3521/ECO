/* eslint-disable */
// @ts-ignore
import RCheckBox from '@react-native-community/checkbox';
/* eslint-enable */
import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { ValidationRules } from 'react-hook-form';
import { applicationColors } from '../../../style.css';
import styles from './style.css';

type CheckBoxPropTypes = {
  onValueChange?: (param: any) => void;
  value?: boolean;
  containerStyle?: ViewStyle;
  containerStyleIOS?: ViewStyle;
  containerStyleAndroid?: ViewStyle;
  name?: string; // use for Form
  rules?: ValidationRules; // use for Form
  errorMessage?: string; // use for Form
  disabled?: boolean;
  color?: string;
};

export default function CheckBox(props: CheckBoxPropTypes) {
  const {
    onValueChange,
    value,
    containerStyle,
    containerStyleIOS,
    containerStyleAndroid,
    errorMessage,
    disabled,
    color,
  } = props;
  const checkedTintColor = color || applicationColors.primary.shade900;
  const unCheckTintColor = errorMessage
    ? applicationColors.semantic.error.shade500
    : applicationColors.neutral.shade300;

  return Platform.OS === 'android' ? (
    <View style={containerStyleAndroid}>
      <RCheckBox
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        tintColors={{
          true: disabled
            ? applicationColors.neutral.shade300
            : checkedTintColor,
          false: disabled
            ? applicationColors.neutral.shade300
            : unCheckTintColor,
        }}
      />
    </View>
  ) : (
    <View style={[styles.iOSCheckBox, containerStyle]}>
      <RCheckBox
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        boxType="square"
        tintColor={
          disabled ? applicationColors.neutral.shade300 : unCheckTintColor
        }
        onCheckColor={
          disabled
            ? applicationColors.neutral.shade300
            : applicationColors.primary.white
        }
        onFillColor={
          disabled ? applicationColors.neutral.shade300 : checkedTintColor
        }
        onTintColor={
          disabled ? applicationColors.neutral.shade300 : checkedTintColor
        }
        style={containerStyleIOS}
      />
    </View>
  );
}
