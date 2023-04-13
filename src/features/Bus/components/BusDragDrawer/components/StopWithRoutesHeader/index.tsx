import { FlatList, View } from 'react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from '../../../../../../components/AppBar';
import Text from '../../../../../../components/Text';
import { useBusState } from '../../../../reducers/bus';
import { useUserState } from '../../../../../User/reducers';
import { applicationIcons } from '../../../../../../../style.css';
import styles from './style.css';
import BusRouteRoundedItem from './BusRouteRoundedItem';
import { BusRouteType } from '../../../../../../services/api/types/bus';

// Show selected Stop with the Routes that go through the stop
export default function BusStopWithRoutesHeader() {
  const [busState, busActions] = useBusState();
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const int18 = useTranslation();

  const onBackPress = () => busActions.popBusDrawerState();

  function onRoutePress(route: BusRouteType) {
    busActions.setSelectedBusRoute(route);
    busActions.pushBusDrawerState('view_stop_actions');
  }

  return (
    <View style={styles.container}>
      <AppBar
        title={busState.selectedBusStop!.name[userLanguage]}
        leadingIcon={applicationIcons.back}
        onLeadingPressed={onBackPress}
      />

      <Text style={styles.label} fontSize="small" bold="bold">
        {int18.t('features.busScreen.busStop.selectARoute')}
      </Text>

      {busState.selectedBusStop!.routes && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={busState.selectedBusStop!.routes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <BusRouteRoundedItem
              onRoutePress={onRoutePress}
              route={item.item}
              stopType={busState.selectedBusStop!.stopType}
            />
          )}
        />
      )}
    </View>
  );
}
