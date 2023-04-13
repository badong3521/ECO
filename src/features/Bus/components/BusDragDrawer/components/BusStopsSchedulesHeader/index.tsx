import { View } from 'react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from '../../../../../../components/AppBar';
import {
  applicationIcons,
  applicationStyle,
} from '../../../../../../../style.css';
import styles from './style.css';
import Text from '../../../../../../components/Text';
import ChipList from '../../../../../../components/ChipList';
import { useBusState } from '../../../../reducers';
import BusRouteApi from '../../../../../../services/api/route';
import { useUserState } from '../../../../../User/reducers';
import SelectDateDropDown from '../../../SelectDateDropDown';
import RouteName from './components/RouteName';

interface BusStopsSchedulesHeaderProps {
  onGoStandard: () => void;
}

// show selected Route Name, selected Stop Name, a dropdown to filter stops by Date, a timeList to filter stops by Time
export default function BusStopsSchedulesHeader(
  props: BusStopsSchedulesHeaderProps,
) {
  const { onGoStandard } = props;
  const int18 = useTranslation();
  const busRouteApi = new BusRouteApi();
  const [busState, busActions] = useBusState();
  const [userState] = useUserState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectedDate = (date: Date) => setSelectedDate(date);

  const onBackPress = () => busActions.popBusDrawerState();

  async function fetchRouteSchedules() {
    if (busState.selectedBusRoute && busState.selectedBusStop) {
      const data = await busRouteApi.getRouteSchedules({
        routeId: busState.selectedBusRoute.id,
        stopId: busState.selectedBusStop.id,
        date: selectedDate,
      });
      if (data.status === 'success') {
        busActions.setBusRouteSchedules(data.result.data);
      } else {
        busActions.setBusRouteSchedules(undefined);
      }
    }
  }

  function getStopName(): string {
    if (busState.selectedBusStop) {
      return busState.selectedBusStop.name[userState.userLanguage];
    }
    return '';
  }

  function onChangeArriveTime(index: number, time: string) {
    busActions.setBusRouteSelectedArriveTime(time);
  }

  useEffect(() => {
    fetchRouteSchedules();
  }, [busState.selectedBusStop, busState.selectedBusRoute, selectedDate]);

  return (
    <View>
      <View style={styles.appBar}>
        <AppBar
          title={getStopName()}
          leadingIcon={applicationIcons.back}
          onLeadingPressed={onBackPress}
          onClosePressed={onGoStandard}
        />
      </View>
      {busState.selectedBusRoute && busState.selectedBusStop && (
        <RouteName
          routeCode={busState.selectedBusRoute.routeCode}
          stopType={busState.selectedBusStop.stopType}
        />
      )}

      <Text bold="bold" style={styles.label}>
        {int18.t('features.busScreen.stopDetail.selectDate')}
      </Text>

      <View style={styles.dropDown}>
        <SelectDateDropDown itemsCount={7} onSelectedDate={onSelectedDate} />
      </View>

      <View style={applicationStyle.bigDivider} />

      <Text bold="bold" style={styles.label}>
        {int18.t('features.busScreen.stopDetail.selectTime')}
      </Text>

      <View style={styles.arriveTimeList}>
        {busState.busRouteSchedules && (
          <ChipList
            data={busState.busRouteSchedules.arriveTimes}
            displayAttribute={undefined}
            onSelectedItemChange={onChangeArriveTime}
          />
        )}
      </View>

      <View style={applicationStyle.bigDivider} />

      <Text style={styles.label} bold="bold">
        {int18.t('features.busScreen.stopDetail.schedule')}
      </Text>
    </View>
  );
}
