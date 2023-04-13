import { FlatList, ScrollView, View } from 'react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import ViewMoreItem from '../ViewMoreItem';
import BusStopTimeItem from '../BusStopTimeItem';
import RouteNameIndicator from '../RouteNameIndicator';
import {
  BusRouteType,
  Stop,
} from '../../../../../../../../services/api/types/bus';
import Text from '../../../../../../../../components/Text';
import { useUserState } from '../../../../../../../User/reducers';

interface ListStopsTimeTableProps {
  stops: Stop[];
  expanded: boolean;
  onToggleDrawer: () => void;
  selectedBusRoute?: BusRouteType;
  stopsBetweenCount: number;
  arriveTimes?: string[];
}

// Show list stops with time table at selected arrive time
export default function ListStopsTimeTable(props: ListStopsTimeTableProps) {
  const {
    stops,
    expanded,
    onToggleDrawer,
    selectedBusRoute,
    stopsBetweenCount,
    arriveTimes,
  } = props;
  const int18 = useTranslation();
  const [userState] = useUserState();
  const { userLanguage } = userState;

  function getArriveTime(index: number): string | undefined {
    if (arriveTimes) {
      const { length, 0: first, [length - 1]: last } = arriveTimes;
      switch (index) {
        case 0:
          return first;
        case stops.length - 1:
          return last;
        default:
          return arriveTimes[index];
      }
    }
    return undefined;
  }

  function isMiddleItem(index: number): boolean {
    if (index === 0) {
      return false;
    }
    if (expanded && index === stops.length - 1) {
      return false;
    }
    if (!expanded && index === 2) {
      return false;
    }
    return true;
  }

  return stops.length > 0 ? (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.subtractContainer} />
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={stops}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => {
          if (!expanded && item.index === 1) {
            return (
              <ViewMoreItem
                onViewMorePress={onToggleDrawer}
                betweenCounts={stopsBetweenCount}
              />
            );
          }
          return (
            <BusStopTimeItem
              stop={item.item}
              isMiddleItem={isMiddleItem(item.index)}
              language={userLanguage}
              arriveTime={getArriveTime(item.index)}
              onItemPress={onToggleDrawer}
            />
          );
        }}
      />

      {selectedBusRoute && (
        <RouteNameIndicator routeName={selectedBusRoute.routeCode} />
      )}
    </ScrollView>
  ) : (
    <Text style={styles.noDataContainer}>
      {int18.t('features.busScreen.busRoute.noRouteFound')}
    </Text>
  );
}
