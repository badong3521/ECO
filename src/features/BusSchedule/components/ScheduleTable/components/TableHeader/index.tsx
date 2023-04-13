import { View } from 'react-native';
import React from 'react';
import styles from '../../style.css';
import Text from '../../../../../../components/Text';
import { Stop } from '../../../../../../services/api/types/bus';

interface TableHeaderProps {
  stops: Stop[];
}

// Render header of the table. The order of columns
export default function TableHeader(props: TableHeaderProps) {
  const { stops } = props;
  return (
    <View style={styles.rowHeader}>
      {stops &&
        stops.length > 0 &&
        stops[0].times.map((t, index) => (
          <View style={styles.header} key={index.toString()}>
            <Text fontSize="small">{(index + 1).toString()}</Text>
          </View>
        ))}
    </View>
  );
}
