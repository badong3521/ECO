import { View, ViewStyle } from 'react-native';
import React from 'react';
import styles from './style.css';
import CheckBox from '../CheckBox';
import { applicationColors } from '../../../style.css';
import Text from '../Text';
import TouchableComponent from '../TouchableComponent';

interface CheckboxFilterItemProps {
  value: boolean;
  onValueChange: () => void;
  title: string;
  styleContainer?: ViewStyle;
  fontSize?: string;
  color?: string;
  styleText?: ViewStyle;
  disabled?: boolean;
}
export default function CheckboxFilterItem(props: CheckboxFilterItemProps) {
  const {
    value,
    onValueChange,
    title,
    styleContainer,
    styleText,
    disabled,
  } = props;

  return (
    <View style={[styles.filterRow, styleContainer]}>
      <CheckBox
        color={applicationColors.semantic.info.shade500}
        containerStyleAndroid={styles.checkbox}
        containerStyleIOS={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      />
      <TouchableComponent onPress={onValueChange}>
        <View>
          <Text fontSize="small" style={styleText}>
            {title}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
}

CheckboxFilterItem.defaultProps = {
  fontSize: 'small',
  disabled: false,
};
