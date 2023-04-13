import { Modal, Platform, TouchableWithoutFeedback, View } from 'react-native';
import * as React from 'react';
import { useEffect, useImperativeHandle, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import { applicationColors } from '../../../style.css';
import styles from './style.css';

const currentDate = new Date();

export interface DatePickerModalRef {
  toggle: () => void;
}

interface DatePickerModalProps {
  datePickerRef: React.RefObject<DatePickerModalRef>;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  onSelectedDate: (date: Date) => void;
}

// Show a modal and can select a date
export default function DatePickerModal(props: DatePickerModalProps) {
  const {
    datePickerRef,
    value,
    minDate = new Date(
      currentDate.getFullYear() - 100,
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
    maxDate = new Date(
      currentDate.getFullYear() + 50,
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
    onSelectedDate,
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const int18n = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>(
    value || (maxDate > currentDate ? currentDate : maxDate),
  );

  function onDismiss() {
    setVisible(false);
  }

  function onDonePress() {
    setVisible(false);
    onSelectedDate(selectedDate);
  }

  // allow parent can call
  useImperativeHandle(
    datePickerRef,
    (): DatePickerModalRef => ({
      toggle: () => {
        setVisible(!visible);
      },
    }),
  );

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  return Platform.OS === 'android' ? (
    <View>
      {visible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={(_event: any, date: any) => {
            setVisible(false);
            if (date) {
              onSelectedDate(date);
            }
          }}
        />
      )}
    </View>
  ) : (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.container}>
          <View style={styles.datePicker}>
            <Button
              type="text"
              title={int18n.t('actions.done')}
              onPress={onDonePress}
              style={{ alignSelf: 'flex-end' }}
              labelStyle={{ color: applicationColors.primary.shade900 }}
            />

            <DateTimePicker
              textColor="black"
              value={selectedDate}
              mode="date"
              display="spinner"
              minimumDate={minDate}
              maximumDate={maxDate}
              onChange={(_event: any, date: any) => {
                setSelectedDate(date!);
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
