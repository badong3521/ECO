import { View } from 'react-native';
import React from 'react';
import styles from '../../style.css';
import Text from '../../../../../../components/Text';
import { StopStyleType } from '../../../../../Bus/types';
import { Stop } from '../../../../../../services/api/types/bus';

interface TableContentProps {
  stops: Stop[];
}

// Render content for schedule table
// each cell is a time
export default function TableContent(props: TableContentProps) {
  const { stops } = props;

  function renderCell(time: string, index: number, stop: Stop) {
    return (
      <View style={styles.cell} key={index.toString()}>
        <Text
          fontSize="small"
          bold="bold"
          numberOfLines={1}
          style={{ color: StopStyleType.get(stop.stopType).color }}
        >
          {time}
        </Text>
      </View>
    );
  }

  function renderRow(stop: Stop, index: number) {
    return (
      <View style={styles.row} key={index.toString()}>
        {stop.times.map((t, i) => renderCell(t, i, stop))}
      </View>
    );
  }

  return <View>{stops && stops.map(renderRow)}</View>;
}
