import { View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import Text from '../../../../../../components/Text';
import styles from './style.css';
import NotFoundImage from '../../../../../../assets/images/search_not_found.svg';

interface EmptyContainerProps {
  message: string;
  subtitle?: string;
  image?: ReactNode;
  style?: ViewStyle | ViewStyle[];
}
export default function EmptyContainer(props: EmptyContainerProps) {
  const { message, subtitle, image, style } = props;

  return (
    <View style={[styles.listEmpty, style]}>
      {image || <NotFoundImage style={styles.listEmptyImage} />}
      <Text style={styles.message}>{message}</Text>
      {subtitle && <Text fontSize="tiny">{subtitle}</Text>}
    </View>
  );
}
