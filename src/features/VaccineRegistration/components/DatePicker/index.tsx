import React from 'react';
import { View } from 'react-native';
import { ValidationRules } from 'react-hook-form';
import InputDatePicker from '../../../../components/InputDatePicker';
import styles from './styles.css';
import IconCalendar from '../../../../assets/vaccine/ic_calendar.svg';
import shareStyle from '../shareStyles.css';

interface Props {
  name?: string;
  rules?: ValidationRules;
  errorMessage?: string;
  value: Date;
  onValueChange: (value: any) => void;
  maxDate?: Date;
}

export default function DatePicker(props: Props) {
  const { errorMessage, onValueChange, value, maxDate } = props;

  const styleDatePicker = errorMessage
    ? {
        ...styles.inputDataPicker,
        ...styles.inputDataPickerError,
      }
    : styles.inputDataPicker;

  return (
    <View style={shareStyle.marginDefault}>
      <InputDatePicker
        name="identity_issue_date"
        label=""
        onValueChange={onValueChange}
        value={value}
        inputStyle={styleDatePicker}
        stylesRow={styles.marginNone}
        maxDate={maxDate}
      />
      <IconCalendar width="20" style={styles.iconDatePicker} />
    </View>
  );
}
