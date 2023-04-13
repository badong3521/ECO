import { FlatList, View } from 'react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Text from '../../../../../../components/Text';
import styles from './style.css';
import { Stop } from '../../../../../../services/api/types/bus';
import { useUserState } from '../../../../../User/reducers';
import BusStopScheduleItem from './components/BusStopScheduleItem';
import { useBusState } from '../../../../reducers';
import { useStandardSearchState } from '../../../../reducers/standardSearch';
import { generateMarkersFromAddressInfo } from '../../../../utils';

// show the "Direct Here" button and list stops around the address
export default function SearchDestinationResultContent() {
  const int18 = useTranslation();
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const [, busActions] = useBusState();
  const [standardSearchState] = useStandardSearchState();

  const onGoToStopDetail = (stop: Stop) => {
    busActions.setSelectedBusStop(stop);
    busActions.pushBusDrawerState('view_stops_with_routes_actions');
  };

  const isEmpty = () =>
    standardSearchState.addressInfo &&
    (!standardSearchState.addressInfo.stops ||
      standardSearchState.addressInfo.stops.length === 0);

  // generate markers
  useEffect(() => {
    if (standardSearchState.addressInfo) {
      busActions.setMarkers(
        generateMarkersFromAddressInfo(
          standardSearchState.addressInfo,
          userState.userLanguage,
        ),
      );
    }
  }, [standardSearchState.addressInfo]);

  return (
    <View>
      <View style={styles.bigDivider} />
      <Text style={styles.label} bold="bold">
        {int18.t('features.busScreen.searchDirection.busStopSchedule')}
      </Text>
      {standardSearchState.addressInfo && (
        <FlatList
          keyboardShouldPersistTaps="always"
          style={styles.searchResult}
          data={standardSearchState.addressInfo.stops}
          renderItem={item => (
            <BusStopScheduleItem
              key={item.index.toString()}
              onStopItemPress={onGoToStopDetail}
              stop={item.item}
              lang={userLanguage}
            />
          )}
        />
      )}
      {isEmpty() && (
        <Text style={styles.noStops}>
          {int18.t('features.busScreen.searchDirection.noStops')}
        </Text>
      )}
    </View>
  );
}
