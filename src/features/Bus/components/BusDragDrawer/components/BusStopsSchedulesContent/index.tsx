import { FlatList } from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBusState } from '../../../../reducers';
import { useUserState } from '../../../../../User/reducers';
import BusStopScheduleItem from './components/BusStopScheduleItem';
import BusStopScheduleItemType from './type';
import { StopScheduleType } from '../../../../../../services/api/types/route';

const maxItems = 5;

// Show List Schedule Stops
export default function BusStopsSchedulesContent() {
  const [busState, busActions] = useBusState();
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const [listStops, setListStops] = useState<StopScheduleType[]>([]);
  const int18 = useTranslation();

  function getType(index: number): BusStopScheduleItemType {
    if (index === 0) {
      return BusStopScheduleItemType.TOP;
    }
    if (index === listStops.length - 1) {
      return BusStopScheduleItemType.BOTTOM;
    }
    if (!busState.isOpenDrawer) {
      switch (index) {
        case maxItems - 1:
          return BusStopScheduleItemType.BELOW_HIDDEN;
        case maxItems - 2:
          return BusStopScheduleItemType.HIDDEN;
        case maxItems - 3:
          return BusStopScheduleItemType.ABOVE_HIDDEN;
        default:
          return BusStopScheduleItemType.NORMAL;
      }
    }
    return BusStopScheduleItemType.NORMAL;
  }

  function onToggleDrawer() {
    busActions.setIsOpenDrawer(!busState.isOpenDrawer);
  }

  // parse listStop got from api
  function parseListStops(): StopScheduleType[] {
    if (busState.isOpenDrawer) {
      return listStops;
    }
    const data = listStops.slice(0, maxItems);
    data[data.length - 1] = listStops[listStops.length - 1];
    return data;
  }

  // this will get list stops for selected arriveTime
  useEffect(() => {
    if (busState.busRouteSchedules) {
      const trips = busState.busRouteSchedules.trips.filter(
        trip =>
          !busState.busRouteSelectedArriveTime ||
          trip.arriveTime === busState.busRouteSelectedArriveTime,
      );
      if (trips && trips.length > 0) {
        setListStops(trips[0].stops);
      }
    }
  }, [busState.busRouteSchedules, busState.busRouteSelectedArriveTime]);

  return (
    <FlatList
      data={parseListStops()}
      keyExtractor={(item, index) => index.toString()}
      renderItem={item => (
        <BusStopScheduleItem
          key={item.index.toString()}
          type={getType(item.index)}
          onToggleDrawer={onToggleDrawer}
          userLanguage={userLanguage}
          stopSchedule={item.item}
          moreStops={listStops.length - maxItems}
          int18={int18}
          firstOrLast={
            item.index === 0 ||
            (busState.isOpenDrawer && item.index === listStops.length - 1) ||
            (!busState.isOpenDrawer && item.index === maxItems - 1)
          }
        />
      )}
    />
  );
}
