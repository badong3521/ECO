import { RadioButton as RRadioButton } from 'react-native-paper';
import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { applicationColors } from '../../../style.css';
import IconComponent from '../Icon';
import TouchableComponent from '../TouchableComponent';

type RadioButtonPropTypes = {
  value: string;
  status: 'checked' | 'unchecked';
  onPress: (param?: any) => void;
  tintColor?: string;
  style?: ViewStyle;
  size?: number;
};

export default function RadioButton(props: RadioButtonPropTypes) {
  const { value, status, onPress, tintColor, style, size } = props;
  return Platform.OS === 'android' ? (
    <RRadioButton.Android
      color={tintColor || applicationColors.primary.shade900}
      uncheckedColor={applicationColors.neutral.shade300}
      value={value}
      status={status}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  ) : (
    <TouchableComponent
      onPress={() => {
        onPress();
      }}
      useForeground
    >
      <View style={[{ padding: 10 }, style]}>
        <IconComponent
          color={
            status === 'checked'
              ? tintColor || applicationColors.primary.shade900
              : applicationColors.neutral.shade300
          }
          name={
            status === 'checked'
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
          }
          size={size!}
        />
      </View>
    </TouchableComponent>
  );
}

RadioButton.defaultProps = {
  size: 23,
  tintColor: applicationColors.semantic.success.shade900,
};
