import { Dimensions, View } from 'react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MapView, { LatLng } from 'react-native-maps';
import { applicationIcons } from '../../../../../../../style.css';
import Button from '../../../../../../components/Button';
import AppBar from '../../../../../../components/AppBar';
import styles from './style.css';
import { useBusState } from '../../../../reducers';
import {
  SearchState,
  useStandardSearchState,
} from '../../../../reducers/standardSearch';
import GoogleLocationApi from '../../../../../../services/api/google';
import { AddressInfoType } from '../../../../../../services/api/types/bus';

interface SelectALocationHeaderProps {
  mapRef?: React.RefObject<MapView>;
}
// show a button to pick the center coordinate of Maps
export default function SelectALocationHeader(
  props: SelectALocationHeaderProps,
) {
  const { mapRef } = props;
  const [busState, busActions] = useBusState();
  const [, standardSearchActions] = useStandardSearchState();
  const int18 = useTranslation();
  const googleLocationApi = new GoogleLocationApi();

  const onBackPress = () => {
    busActions.popBusDrawerState();
  };

  async function getCenterCoordinated(): Promise<LatLng | undefined> {
    return mapRef?.current?.coordinateForPoint({
      x: Dimensions.get('screen').width / 2,
      y: Dimensions.get('screen').height / 2,
    });
  }

  // fetch address info for selected coordinate
  async function fetchAddressInfoForSelectedLocation(
    nearByStops: boolean,
  ): Promise<AddressInfoType> {
    const centerCoordinate = await getCenterCoordinated();
    const data = await googleLocationApi.searchAddressByCoordinate(
      centerCoordinate!,
      nearByStops,
    );
    if (data.status === 'success') {
      return data.result.data;
    }
    return {
      location: {
        coordinates: [centerCoordinate!.latitude, centerCoordinate!.longitude],
      },
    };
  }

  // check previous screen and get the address info of selected coordinate
  async function onSelectCenterLocation() {
    busActions.popBusDrawerState();
    if (busState.busDrawerStatesStack[1]) {
      if (busState.busDrawerStatesStack[1] === 'standard_search') {
        standardSearchActions.setSearchState(SearchState.GET_RESULT);
        const data = await fetchAddressInfoForSelectedLocation(true);
        standardSearchActions.setAddressInfo(data);
        return;
      }
      if (
        busState.busDrawerStatesStack[1] ===
        'search_from_departure_to_destination'
      ) {
        const data = await fetchAddressInfoForSelectedLocation(false);
        if (busState.searchBarType === 'departure') {
          busActions.setDepartureLocation(data.location);
          busActions.setSearchBarType('destination');
        } else {
          busActions.setDestinationLocation(data.location);
        }
      }
    }
  }

  return (
    <View>
      <View style={styles.appBarContainer}>
        <AppBar
          title={int18.t('features.busScreen.searchDirection.selectALocation')}
          onLeadingPressed={onBackPress}
          leadingIcon={applicationIcons.back}
        />
      </View>
      <Button
        style={styles.button}
        type="primary"
        title={int18.t('actions.ok')}
        onPress={onSelectCenterLocation}
      />
    </View>
  );
}
