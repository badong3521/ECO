import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../components/Text';
import Dropdown from '../../components/Dropdown';
import BusStopTypes from './components/BusStopTypes';
import BusScheduleNotice from './components/BusScheduleNotice';
import { BusRouteType } from '../../services/api/types/bus';
import BusApi from '../../services/api/bus';
import Loader from '../../components/Loader';
import ScheduleTable from './components/ScheduleTable';
import { useUserState } from '../User/reducers';

// This screen is showing schedule for all bus route
export default function BusScheduleScreen() {
  const i18n = useTranslation();
  const busApi = new BusApi();
  const [selectedRoute, setSelectedRoute] = useState<BusRouteType>();
  const [routes, setRoutes] = useState<BusRouteType[]>();
  const [userState] = useUserState();

  async function fetchSchedule(id?: number) {
    const res = await busApi.fetchBusSchedules(id);
    if (res.status === 'success') {
      if (!routes) {
        setRoutes(res.result.data.availableRoutes);
      }
      setSelectedRoute(res.result.data.route);
    }
  }

  function onChangeRoute(value: any) {
    if (value) {
      fetchSchedule(value);
    }
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  return selectedRoute ? (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <BusStopTypes />
        <Text bold="bold" style={styles.label}>
          {i18n.t('features.busScheduleScreen.selectRoute')}
        </Text>
        <View style={styles.dropdown}>
          <Dropdown
            data={routes || []}
            value={`${selectedRoute.routeCode} - ${selectedRoute.name}`}
            valueExtractor={value => value.id}
            labelExtractor={(value: BusRouteType) =>
              `${value.routeCode} - ${value.name}`
            }
            onChangeText={onChangeRoute}
            label=""
            itemCount={9} // I changed to 9 because it will able to scroll
          />
        </View>
        {selectedRoute.note && (
          <BusScheduleNotice
            notice={selectedRoute.note[userState.userLanguage]}
          />
        )}
        <Text bold="bold" style={styles.label}>
          {i18n.t('features.busScheduleScreen.schedule')}
        </Text>

        <ScheduleTable
          route={selectedRoute}
          language={userState.userLanguage}
        />
      </View>
    </ScrollView>
  ) : (
    <View style={styles.root}>
      <Loader style={styles.loading} />
    </View>
  );
}
