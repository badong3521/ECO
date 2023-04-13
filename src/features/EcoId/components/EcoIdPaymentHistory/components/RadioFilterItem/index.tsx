import { View } from 'react-native';
import React from 'react';
import styles from '../FilterAccoridion/style.css';
import { applicationColors } from '../../../../../../../style.css';
import Text from '../../../../../../components/Text';
import { SortTypes } from '../../../../../../services/api/types/ecoid';
import RadioButton from '../../../../../../components/RadioButton';
import TouchableComponent from '../../../../../../components/TouchableComponent';

interface RadioFilterItemProps {
  value: SortTypes;
  status: 'checked' | 'unchecked';
  title: string;
  onPress: () => void;
}
export default function RadioFilterItem(props: RadioFilterItemProps) {
  const { value, status, title, onPress } = props;
  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.cell}>
        <RadioButton
          tintColor={applicationColors.semantic.info.shade500}
          value={value}
          status={status}
          onPress={onPress}
        />
        <Text fontSize="small" style={styles.sortText}>
          {title}
        </Text>
      </View>
    </TouchableComponent>
  );
}
