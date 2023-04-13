import { View } from 'react-native';
import React from 'react';
import styles from '../FilterAccoridion/style.css';
import CheckBox from '../../../../../../components/CheckBox';
import { applicationColors } from '../../../../../../../style.css';
import Text from '../../../../../../components/Text';
import TouchableComponent from '../../../../../../components/TouchableComponent';

interface CheckboxFilterItemProps {
  value: boolean;
  onValueChange: () => void;
  title: string;
}
export default function CheckboxFilterItem(props: CheckboxFilterItemProps) {
  const { value, onValueChange, title } = props;
  return (
    <View style={styles.filterRow}>
      <CheckBox
        color={applicationColors.semantic.info.shade500}
        containerStyleAndroid={styles.checkbox}
        containerStyleIOS={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
      />
      <TouchableComponent onPress={onValueChange}>
        <View>
          <Text fontSize="small">{title}</Text>
        </View>
      </TouchableComponent>
    </View>
  );
}
