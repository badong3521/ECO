import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../../components/Button';
import AppBar from '../../../../../../components/AppBar';
import { applicationIcons } from '../../../../../../../style.css';
import { useBusState } from '../../../../reducers';
import { useUserState } from '../../../../../User/reducers';
import styles from './style.css';
import RouteName from '../BusStopsSchedulesHeader/components/RouteName';

export default function StopActionsHeader() {
  const [busState, busActions] = useBusState();
  const [userState] = useUserState();
  const { i18n } = useTranslation();
  const { userLanguage } = userState;
  const { selectedBusStop, selectedBusRoute } = busState;

  const onBackPress = () => {
    // @ts-ignore
    busActions.popBusDrawerState();
    // @ts-ignore
    // I comment this line because the previous state maybe is `stopWithRoutesAction`, still need selectedBusStop
    // busActions.setSelectedBusStop(undefined);
  };

  const onShowDirectionPress = () => {
    busActions.pushBusDrawerState('view_trip_details');
  };

  const onShowSchedulePress = () => {
    busActions.pushBusDrawerState('view_stop_schedule');
  };

  return (
    <View>
      <View style={styles.appBar}>
        <AppBar
          title={selectedBusStop?.name[userLanguage] || ''}
          leadingIcon={applicationIcons.back}
          onLeadingPressed={onBackPress}
        />
      </View>
      <View style={styles.routeNameContainer}>
        <RouteName
          routeCode={selectedBusRoute!.routeCode}
          stopType={selectedBusStop!.stopType}
        />
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            title={i18n.t('features.busScreen.busStop.showDirectionButton')}
            onPress={onShowDirectionPress}
            uppercase={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            type="secondary"
            title={i18n.t('features.busScreen.busStop.showScheduleButton')}
            onPress={onShowSchedulePress}
            uppercase={false}
          />
        </View>
      </View>
    </View>
  );
}
