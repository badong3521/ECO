import { Keyboard, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { applicationColors } from '../../../../../../../style.css';
import GoogleLocationApi from '../../../../../../services/api/google';
import { useBusState } from '../../../../reducers';
import { LocationType } from '../../../../../../services/api/types/bus';
import { useMapState } from '../../../../../../components/Map/reducers';
import { SearchbarType } from '../../../../types';
import SearchActionBar from './components/SearchActionBar';
import SearchFromDepartureContent from './components/SearchFromDepartureContent';
import { useSearchHistoryState } from '../../../../../../components/SearchBar/reducers/searchHistory';

// Show 2 SearchBars to get the routes from departure to destination location
// User also can get current location and pick a location from map to set to departure/destination
export default function SearchFromDeparture() {
  const int18 = useTranslation();
  const [, actions] = useSearchHistoryState();
  const [busState, busActions] = useBusState();
  const [mapState] = useMapState();
  const currentLocation = {
    latitude: mapState.latitude,
    longitude: mapState.longitude,
  };
  const googleLocationApi = new GoogleLocationApi();
  const [isSearching, setIsSearching] = useState(false);

  const fetchAddressByName = async (address: string) => {
    const data = await googleLocationApi.searchAddressByName(address, false);
    if (data.status === 'success') {
      if (busState.searchBarType === 'departure') {
        busActions.setDepartureLocation(data.result.data.location);
        busActions.setSearchBarType('destination');
      } else {
        busActions.setDestinationLocation(data.result.data.location);
      }
    }
  };

  function onBackPress() {
    busActions.setPolylines(undefined);
    busActions.setMarkers(undefined);
    busActions.setDestinationLocation(undefined);
    busActions.setDepartureLocation(undefined);
    busActions.popBusDrawerState();
  }

  function onCurrentLocationPress() {
    Keyboard.dismiss();
    currentLocation.latitude = mapState.latitude;
    currentLocation.longitude = mapState.longitude;
    if (busState.searchBarType === 'departure') {
      busActions.setDepartureLocation({
        coordinates: [currentLocation.latitude, currentLocation.longitude],
        address: '',
      });
      busActions.setSearchBarType('destination');
    } else {
      busActions.setDestinationLocation({
        coordinates: [currentLocation.latitude, currentLocation.longitude],
        address: '',
      });
    }
  }

  function onSwapLocation() {
    const temp = busState.destinationLocation;
    busActions.setDestinationLocation(busState.departureLocation!);
    busActions.setDepartureLocation(temp!);
  }

  function onChooseOnMapPress() {
    Keyboard.dismiss();
    busActions.pushBusDrawerState('select_a_location');
  }

  function onSubmitSearch(text: string, type: SearchbarType) {
    busActions.setSearchBarType(type);
    fetchAddressByName(text);
  }

  function addSearchHistory(location: LocationType) {
    actions.addBusSearchHistory(location.address!);
  }

  function onClearText(type: SearchbarType) {
    busActions.setSearchBarType(type);
    if (type === 'departure') {
      busActions.setDepartureLocation(undefined);
    } else {
      busActions.setDestinationLocation(undefined);
    }
  }

  function onFocusChange(focus: boolean, type: SearchbarType) {
    setIsSearching(focus);
    if (focus) {
      busActions.setSearchBarType(type);
    }
  }

  function getSearchBarText(location: LocationType | undefined): string {
    if (location) {
      if (location.coordinates && currentLocation) {
        if (
          location.coordinates[0] === currentLocation.latitude &&
          location.coordinates[1] === currentLocation.longitude
        ) {
          return '';
        }
      }
      if (location.address) {
        return location.address;
      }
    }
    return '';
  }

  function getSearchBarHintText(location: LocationType | undefined): string {
    if (location && location.coordinates && currentLocation) {
      if (
        location.coordinates[0] === currentLocation.latitude &&
        location.coordinates[1] === currentLocation.longitude
      ) {
        return int18.t('features.busScreen.searchDestination.currentLocation');
      }
    }
    return int18.t('features.busScreen.bottomDrawer.searchHint');
  }

  function getSearchBarHintColor(location: LocationType | undefined): string {
    if (location && location.coordinates && currentLocation) {
      if (
        location.coordinates[0] === currentLocation.latitude &&
        location.coordinates[1] === currentLocation.longitude
      ) {
        return applicationColors.semantic.info.shade500;
      }
    }
    return applicationColors.neutral.shade300;
  }

  // add destination address to search history
  useEffect(() => {
    if (busState.destinationLocation && busState.destinationLocation.address) {
      addSearchHistory(busState.destinationLocation);
    }
  }, [busState.destinationLocation]);

  // if departure is not set, will get currentLocation
  useEffect(() => {
    if (!busState.departureLocation) {
      busActions.setDepartureLocation({
        coordinates: [currentLocation.latitude, currentLocation.longitude],
        address: '',
      });
      busActions.setSearchBarType('destination');
    }
  }, []);

  return (
    <View>
      <SearchActionBar
        onBackPress={onBackPress}
        departureText={getSearchBarText(busState.departureLocation)}
        departureHintText={getSearchBarHintText(busState.departureLocation)}
        departureHintColor={getSearchBarHintColor(busState.departureLocation)}
        destinationText={getSearchBarText(busState.destinationLocation)}
        destinationHintText={getSearchBarHintText(busState.destinationLocation)}
        destinationHintColor={getSearchBarHintColor(
          busState.destinationLocation,
        )}
        onClearText={onClearText}
        onFocusChange={onFocusChange}
        onSubmitSearch={onSubmitSearch}
        onSwapLocation={onSwapLocation}
        onCurrentLocationPress={onCurrentLocationPress}
        onChooseOnMapPress={onChooseOnMapPress}
        isSearching={isSearching}
      />
      <SearchFromDepartureContent
        isSearching={isSearching}
        onSubmitSearch={onSubmitSearch}
      />
    </View>
  );
}
