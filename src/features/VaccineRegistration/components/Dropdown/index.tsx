import React from 'react';
import { ValidationRules } from 'react-hook-form';
import { Platform, TextStyle, ViewStyle } from 'react-native';
import { Dropdown as RDropdown } from 'react-native-material-dropdown';
import Input from '../Input';
import { applicationDimensions, scaleFactor } from '../../../../../style.css';
import styles from './style.css';

export interface DropdownPropTypes {
  data: Object[];
  label?: string;
  value?: string | number;
  errorMessage?: 'required' | string;
  onChangeText?: (input: any, index: number) => void;
  valueExtractor?: (value: any) => string | number | null;
  labelExtractor?: (value: any) => string | number | null;
  itemCount?: number;
  type?: DropdownType;
  rules?: ValidationRules;
  name?: string;
  dropdownPosition?: number | null;
  disabled?: boolean;
  noneItemId?: string; // if it is set, when `None` item is selected, it will shown like unselected item
  style?: ViewStyle | TextStyle;
  placeholderTextColor?: string;
}

type DropdownType = 'material' | 'round';

export default function Dropdown(props: DropdownPropTypes) {
  const {
    data,
    label,
    value,
    errorMessage,
    onChangeText,
    valueExtractor,
    labelExtractor,
    itemCount,
    type,
    disabled,
    dropdownPosition,
    noneItemId,
    style,
    placeholderTextColor,
  } = props;
  switch (type) {
    case 'round':
      return (
        <RDropdown
          style={[styles.textStyle, style]}
          itemTextStyle={styles.textStyle}
          data={data}
          value={value || undefined}
          label={label}
          onChangeText={onChangeText}
          itemCount={itemCount}
          valueExtractor={valueExtractor}
          labelExtractor={labelExtractor}
          dropdownPosition={dropdownPosition}
          rippleInsets={{
            top: applicationDimensions.smallPadding * scaleFactor,
            bottom:
              Platform.OS === 'ios'
                ? 0
                : -applicationDimensions.smallPadding * scaleFactor,
          }}
          disabled={disabled}
          renderBase={(params: any) => {
            return (
              <Input
                errorMessage={errorMessage}
                editable={false}
                inputStyle={style}
                label={label!}
                placeholderTextColor={placeholderTextColor}
                value={params.value === noneItemId ? undefined : params.title}
                withButtons
                disabled={disabled}
                buttons={[{ iconName: 'keyboard-arrow-down' }]}
                inputError={{ marginBottom: 0 }}
              />
            );
          }}
        />
      );
    case 'material':
    default:
      return (
        <RDropdown
          data={data}
          value={value || undefined}
          label={label}
          error={errorMessage || undefined}
          onChangeText={onChangeText}
          itemCount={itemCount}
          valueExtractor={valueExtractor}
          labelExtractor={labelExtractor}
          dropdownPosition={dropdownPosition}
          disabled={disabled}
          itemTextStyle={styles.textStyle}
          style={styles.textStyle}
        />
      );
  }
}

Dropdown.defaultProps = {
  itemCount: 10,
  dropdownPosition: 0, // This is set to 0 so that the list container does not centrally align on the selected element
};
