import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import BusStopItem from '../../../BusStopItem';
import { useBusState } from '../../../../reducers';
import { useUserState } from '../../../../../User/reducers';
import { Stop } from '../../../../../../services/api/types/bus';
import styles from './style.css';

export default function RouteDetailsContent() {
  const [busState, busActions] = useBusState();
  const [userState] = useUserState();

  function onBusStopPress(stop: Stop) {
    busActions.setSelectedBusStop(stop);
    busActions.pushBusDrawerState('view_stop_actions');
  }

  return busState.selectedBusRoute ? (
    <FlatList
      style={[styles.list]}
      contentContainerStyle={{
        paddingBottom: busState.isOpenDrawer
          ? 0
          : Dimensions.get('screen').height * 0.5,
      }}
      data={busState.selectedBusRoute.stops}
      keyExtractor={(value, index) => index.toString()}
      renderItem={item => (
        <BusStopItem
          stop={item.item}
          lang={userState.userLanguage}
          onBusStopPress={onBusStopPress}
        />
      )}
    />
  ) : null;
}
