import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Switch } from 'react-native-paper';
import Text from '../../../../components/Text';
import { applicationColors } from '../../../../../style.css';
import styles from '../../style.css';

interface ToggleNotificationItemProps {
  label: string;
  enable?: boolean;
  onValueChange: (enable: boolean) => void;
  errors?: boolean;
}

// Containing a title and a switcher button
export default function ToggleNotificationItem(
  props: ToggleNotificationItemProps,
) {
  const { enable, label, onValueChange, errors } = props;
  const [checked, setChecked] = useState(enable); // need to save the switcher value to avoid delay update when API is called

  useEffect(() => {
    setChecked(enable);
  }, [enable]);

  // if has any errors, it will revert to the initial value
  useEffect(() => {
    if (errors) {
      setChecked(enable);
    }
  }, [errors]);

  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text fontSize="small" style={styles.label}>
          {label}
        </Text>
      </View>
      <Switch
        value={checked}
        color={applicationColors.primary.shade900}
        onValueChange={value => {
          setChecked(value);
          onValueChange(value);
        }}
      />
    </View>
  );
}
