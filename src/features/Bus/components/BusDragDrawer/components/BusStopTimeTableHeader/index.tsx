import * as React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppBar from '../../../../../../components/AppBar';
import { applicationIcons } from '../../../../../../../style.css';
import styles from './style.css';
import { useBusState } from '../../../../reducers';

interface BusStopTimeTableHeaderProps {
  onGoStandard: () => void;
}

// Show AppBar for `Your Trips` list
export default function BusStopTimeTableHeader(
  props: BusStopTimeTableHeaderProps,
) {
  const { onGoStandard } = props;
  const int18 = useTranslation();
  const [, busActions] = useBusState();

  function onBackPress() {
    busActions.popBusDrawerState();
  }

  return (
    <View style={styles.container}>
      <AppBar
        title={int18.t('features.busScreen.busRoute.yourTrip')}
        leadingIcon={applicationIcons.back}
        onLeadingPressed={onBackPress}
        onClosePressed={onGoStandard}
      />
    </View>
  );
}
