import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ValidationRules } from 'react-hook-form';
import DatePickerModal, { DatePickerModalRef } from '../DatePickerModal';
import { getDateDDMMYYYY } from '../../utils/date';
import Input from '../Input';
import IconCalendar from '../../assets/images/ic_calendar.svg';
import styles from './style.css';
import { ValidationRules } from 'react-hook-form';

interface InputDatePickerProps {
  label: string;
  name?: string; // use for Form
  onValueChange?: (value: any) => void; // use for Form
  rules?: ValidationRules; // use for Form
  value?: Date;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  stylesRow?: ViewStyle;
  maxDate?: Date;
  showIcon?: boolean;
  flatOutlined?: boolean;
  errorMessage?: 'required' | string;
}

// Component allow select a date by showing a dialog to select day, month and year
// this can be used in Form
export default function InputDatePicker(props: InputDatePickerProps) {
  const {
    onValueChange,
    value,
    label,
    containerStyle,
    inputStyle,
    stylesRow,
    maxDate,
    showIcon,
    flatOutlined,
    errorMessage,
  } = props;
  const datePickerRef = React.createRef<DatePickerModalRef>();

  function onPress() {
    datePickerRef?.current?.toggle();
  }

  return (
    <View style={containerStyle}>
      <Input
        value={value ? getDateDDMMYYYY(value) : label}
        onPress={onPress}
        caretHidden
        containerStyle={inputStyle}
        styleRow={stylesRow}
        flatOutlined={flatOutlined}
        errorMessage={errorMessage}
      />
      {showIcon && (
        <View style={styles.iconDatePicker}>
          <IconCalendar />
        </View>
      )}

      <DatePickerModal
        datePickerRef={datePickerRef}
        onSelectedDate={onValueChange!}
        value={value}
        maxDate={maxDate}
      />
    </View>
  );
}
