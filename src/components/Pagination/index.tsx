import { View, ViewStyle } from 'react-native';
import React from 'react';
import { Pagination as RPagination } from 'react-native-snap-carousel';
import styles from './style.css';

interface PaginationProps {
  dotsLength: number;
  activeDotIndex: number;
  containerStyle?: ViewStyle;
}

export default function Pagination(props: PaginationProps) {
  const { dotsLength, activeDotIndex, containerStyle } = props;
  return (
    <RPagination
      containerStyle={containerStyle}
      dotsLength={dotsLength}
      inactiveDotElement={<View style={styles.inactiveDot} />}
      dotElement={<View style={styles.activeDot} />}
      activeDotIndex={activeDotIndex}
    />
  );
}
