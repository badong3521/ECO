import { View, ViewStyle } from 'react-native';
import * as React from 'react';
import styles, { overWhiteMask } from './style.css';
import BusStopScheduleItemType from '../../type';

interface LeftConnectLineIndicatorProps {
  type: BusStopScheduleItemType;
}

// show line and a indicator to connect between 2 rows.
// style of line and indicator will be different base on the position of row in the list
export default function LeftConnectLineIndicator(
  props: LeftConnectLineIndicatorProps,
) {
  const { type } = props;
  return (
    <View style={styles.row}>
      <View style={styles.connectRowContainer}>
        <View style={getAboveLineStyle(type)} />
        <View style={getBelowLineStyle(type)} />

        {(type === BusStopScheduleItemType.HIDDEN ||
          type === BusStopScheduleItemType.BELOW_HIDDEN) && (
          <View
            style={overWhiteMask(type === BusStopScheduleItemType.HIDDEN)}
          />
        )}
      </View>
      <View style={getCenterIndicator(type)} />
    </View>
  );
}

function getAboveLineStyle(type: BusStopScheduleItemType): ViewStyle {
  switch (type) {
    case BusStopScheduleItemType.TOP:
      return styles.hideConnectLine;
    case BusStopScheduleItemType.HIDDEN:
      return styles.dashConnectLine;
    case BusStopScheduleItemType.BELOW_HIDDEN:
      return styles.aboveHiddenLine;
    default:
      return styles.topConnectLine;
  }
}

function getBelowLineStyle(type: BusStopScheduleItemType): ViewStyle {
  switch (type) {
    case BusStopScheduleItemType.BOTTOM:
    case BusStopScheduleItemType.BELOW_HIDDEN:
      return styles.hideConnectLine;
    case BusStopScheduleItemType.HIDDEN:
      return styles.dashConnectLine;
    case BusStopScheduleItemType.ABOVE_HIDDEN:
      return styles.belowHiddenConnectLine;
    default:
      return styles.bottomConnectLine;
  }
}

function getCenterIndicator(type: BusStopScheduleItemType): ViewStyle {
  switch (type) {
    case BusStopScheduleItemType.TOP:
    case BusStopScheduleItemType.BELOW_HIDDEN:
    case BusStopScheduleItemType.BOTTOM:
      return styles.squareIndicator;
    case BusStopScheduleItemType.NORMAL:
    case BusStopScheduleItemType.ABOVE_HIDDEN:
      return styles.circleIndicator;
    default:
      return styles.noIndicator;
  }
}
