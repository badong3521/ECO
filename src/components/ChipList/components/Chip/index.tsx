import React from 'react';
import { View } from 'react-native';
import Text from '../../../Text';
import TouchableComponent from '../../../TouchableComponent';
import styles from './style.css';

interface ChipPropType {
  onPress: (item: any, index: number) => void;
  active: boolean;
  displayAttribute: string;
  item: any;
  index: number;
}

export default function Chip(props: ChipPropType) {
  const { onPress, active, displayAttribute, item, index } = props;

  return (
    <TouchableComponent onPress={() => onPress(item, index)}>
      <View style={[styles.chip, active ? styles.selectItem : null]}>
        <Text style={[styles.text, active ? styles.selectedText : undefined]}>
          {displayAttribute}
        </Text>
      </View>
    </TouchableComponent>
  );
}
