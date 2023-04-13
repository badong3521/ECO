import { View, ViewStyle } from 'react-native';
import React from 'react';
import Text from '../../../../../../components/Text';
import styles from './style.css';

interface BillDetailItemProps {
  title: string;
  content: string | undefined;
  bold?: 'semiBold' | 'bold';
  style?: ViewStyle;
  color?: 'black' | 'darkGrey';
}

// Display a detail row inside a bill
export default function BillDetailItem(props: BillDetailItemProps) {
  const { title, content, bold, style, color } = props;
  return (
    <View style={[styles.row, style]}>
      <Text fontSize="small" style={styles.detailTitle} bold={bold}>
        {title || ''}
      </Text>
      {content && (
        <Text bold="bold" fontSize="small" color={color || 'darkGrey'}>
          {content || ''}
        </Text>
      )}
    </View>
  );
}
