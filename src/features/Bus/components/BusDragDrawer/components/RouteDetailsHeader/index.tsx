import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import {
  applicationColors,
  applicationIcons,
} from '../../../../../../../style.css';
import AppBar from '../../../../../../components/AppBar';
import Text from '../../../../../../components/Text';
import Loader from '../../../../../../components/Loader';
import { useBusState } from '../../../../reducers';

// This component will show the bus route info and list all route's stations.
export default function RouteDetailsHeader() {
  const { i18n } = useTranslation();
  const [busState, busActions] = useBusState();

  const onBackClick = () => {
    // @ts-ignore
    busActions.setSelectedBusRoute(undefined);
    // @ts-ignore
    busActions.setSelectedBusStop(undefined);
    // @ts-ignore
    busActions.popBusDrawerState();
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBarContainer}>
        <AppBar
          title={i18n.t('features.busScreen.busRoute.allStops')}
          leadingIcon={applicationIcons.back}
          onLeadingPressed={onBackClick}
        />
      </View>
      <View style={styles.routeNameContainer}>
        <View>
          {busState.selectedBusRoute ? (
            <Text style={styles.routeName}>
              {`${busState.selectedBusRoute.routeCode} - ${busState.selectedBusRoute.name}`}
            </Text>
          ) : (
            <Loader color={applicationColors.primary.shade500} />
          )}
        </View>
      </View>
    </View>
  );
}
