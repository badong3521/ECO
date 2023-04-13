import React, { useEffect } from 'react';
import { Keyboard, View, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import {
  BusRouteType,
  LocationType,
} from '../../../../../../services/api/types/bus';
import SearchBar from '../../../../../../components/SearchBar';
import Button from '../../../../../../components/Button';
import ChipList from '../../../../../../components/ChipList';
import styles, { searchBar } from './style.css';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../../../style.css';
import IconButton from '../../../../../../components/IconButton';
import { useBusState } from '../../../../reducers';
import {
  SearchState,
  useStandardSearchState,
} from '../../../../reducers/standardSearch';
import GoogleLocationApi from '../../../../../../services/api/google';
import useKeyboard from '../../../../../../utils/hooks/useKeyboard';
import FavoriteLocationApi from '../../../../../../services/api/favoriteLocation';
import { FavoriteLocationParamType } from '../../../../../../services/api/types/favoriteLocation';
import { useUserState } from '../../../../../User/reducers';
import Firebase, { EventIdType } from '../../../../../../services/firebase';

interface StandardSearchHeaderProps {
  routes?: BusRouteType[];
  onBusRoutePress: (index: number, item: BusRouteType) => void;
  navigation: any;
}

// Render a default search bar with back and  pick a location actions
function StandardSearchHeader(props: StandardSearchHeaderProps) {
  const { routes, onBusRoutePress, navigation } = props;
  const { params = {} } = navigation.state;
  const { i18n } = useTranslation();
  const [busState, busActions] = useBusState();
  const { editingShortcut } = busState;
  const [standardSearchState, standardSearchActions] = useStandardSearchState();
  const googleLocationApi = new GoogleLocationApi();
  const keyboardVisible = useKeyboard();
  const favoriteLocationApi = new FavoriteLocationApi();
  const [userState] = useUserState();
  const { favoriteBusLocations } = userState;
  const searchInputRef = React.createRef<TextInput>();

  async function onSetShortcutPress(name: string) {
    const isDefinedShortcut = favoriteBusLocations?.find(
      location => location.name === name,
    );
    if (isDefinedShortcut) {
      await favoriteLocationApi.deleteFavoriteLocation(isDefinedShortcut.id);
    }
    await addFavoriteLocation(name);
    standardSearchActions.setSearchState(SearchState.NONE);
    standardSearchActions.setAddressInfo(undefined);
    busActions.setEditingShortcut(undefined);
    if (params.isEditingBusShortcuts) {
      navigation.navigate('BusShortcutScreen', { isEditingBusShortcuts: true });
    }
  }

  const setShortcutButtonTitle = (shortcutName: string): string => {
    return `${i18n.t('features.busScreen.shortcuts.set')} ${i18n
      .t(`features.busScreen.shortcuts.${shortcutName}`)
      .toLowerCase()}`;
  };

  const onChangeTextSearch = (t: string) => {
    if (t.length > 0) {
      standardSearchActions.setSearchState(SearchState.SEARCHING);
    }
  };

  const onSubmitText = async (t: string) => {
    if (t.length > 0) {
      standardSearchActions.setSearchState(SearchState.GET_RESULT);
      const data = await googleLocationApi.searchAddressByName(t, true);
      if (data.status === 'success') {
        standardSearchActions.setAddressInfo(data.result.data);
      } else {
        standardSearchActions.setAddressInfo(undefined);
      }
    } else {
      standardSearchActions.setSearchState(SearchState.NONE);
    }
  };

  function onSelectALocationPress() {
    busActions.pushBusDrawerState('select_a_location');
  }

  function onClearText() {
    if (standardSearchState.searchState === SearchState.GET_RESULT) {
      standardSearchActions.setSearchState(SearchState.NONE);
      standardSearchActions.setAddressInfo(undefined);
    } else {
      searchInputRef.current?.clear();
    }
  }

  function onBackPress() {
    if (standardSearchState.searchState === SearchState.SEARCHING) {
      if (editingShortcut) {
        busActions.setEditingShortcut(undefined);
      }
    }
    standardSearchActions.setAddressInfo(undefined);
    Keyboard.dismiss();
    standardSearchActions.setSearchState(SearchState.NONE);
  }

  const getAddressName = () => {
    if (
      standardSearchState.addressInfo &&
      standardSearchState.addressInfo.location
    ) {
      return standardSearchState.addressInfo.location.address;
    }
    return '';
  };

  const onGoSearchToDestination = (location?: LocationType) => {
    busActions.setDestinationLocation(
      location || standardSearchState.addressInfo.location,
    );
    busActions.setDepartureLocation(undefined);
    busActions.setSearchBarType('departure');
    busActions.pushBusDrawerState('search_from_departure_to_destination');
  };

  async function addFavoriteLocation(name: string) {
    if (standardSearchState.addressInfo.location) {
      const { location } = standardSearchState.addressInfo;
      const requestParams: FavoriteLocationParamType = {
        name,
        origin: 'ecobus',
        address: location.address,
        latitude: location.coordinates[0],
        longitude: location.coordinates[1],
      };
      await favoriteLocationApi.addFavoriteLocation(requestParams);
      await favoriteLocationApi.fetchFavoriteBusLocations();
    }
    busActions.setEditingShortcut(undefined);
  }

  useEffect(() => {
    if (!navigation.isFocused()) return;
    if (keyboardVisible) {
      standardSearchActions.setSearchState(SearchState.SEARCHING);
    } else if (standardSearchState.searchState === SearchState.SEARCHING) {
      standardSearchActions.setSearchState(SearchState.NONE);
    }
  }, [keyboardVisible]);

  useEffect(() => {
    trackSearchAddressEvent(standardSearchState.searchState);
    if (standardSearchState.searchState === SearchState.SEARCHING) {
      searchInputRef.current?.focus();
    }
  }, [standardSearchState.searchState]);

  return (
    <View>
      <View style={styles.container}>
        {standardSearchState.searchState !== SearchState.NONE && (
          <IconButton
            type="clear"
            padding={applicationDimensions.smallPadding}
            iconName={applicationIcons.back}
            iconSize={22}
            iconColor={applicationColors.neutral.shade900}
            onPress={onBackPress}
          />
        )}
        <SearchBar
          searchInputRef={searchInputRef}
          style={searchBar(standardSearchState.searchState)}
          hintText={i18n.t('features.busScreen.bottomDrawer.searchHint')}
          text={getAddressName()}
          onClearText={onClearText}
          onSubmitEditing={onSubmitText}
          onChangeText={onChangeTextSearch}
        />
        {standardSearchState.searchState === SearchState.SEARCHING && (
          <IconButton
            type="clear"
            padding={applicationDimensions.smallPadding}
            onPress={onSelectALocationPress}
            iconName="pin-drop"
            iconSize={22}
            iconColor={applicationColors.primary.shade900}
          />
        )}
      </View>
      {standardSearchState.searchState === SearchState.NONE && (
        <View style={styles.routeList}>
          <ChipList
            data={routes!}
            displayAttribute="routeCode"
            onSelectedItemChange={onBusRoutePress}
          />
        </View>
      )}
      {standardSearchState.searchState === SearchState.GET_RESULT &&
        !editingShortcut && (
          <View style={{ paddingBottom: applicationDimensions.defaultPadding }}>
            <Button
              style={[styles.directHereBtn, { marginBottom: 0 }]}
              type="primary"
              loading={!standardSearchState.addressInfo}
              title={i18n.t('features.busScreen.searchDirection.directMeHere')}
              uppercase={false}
              onPress={() => onGoSearchToDestination()}
            />
          </View>
        )}
      {standardSearchState.searchState === SearchState.GET_RESULT &&
        editingShortcut && (
          <Button
            style={styles.directHereBtn}
            type="primary"
            loading={!standardSearchState.addressInfo}
            title={setShortcutButtonTitle(editingShortcut)}
            uppercase={false}
            onPress={() => onSetShortcutPress(editingShortcut)}
          />
        )}
    </View>
  );
}

export default withNavigation(StandardSearchHeader);

function trackSearchAddressEvent(standardSearchState: SearchState) {
  let eventId: EventIdType;
  // eslint-disable-next-line default-case
  switch (standardSearchState) {
    case SearchState.NONE:
      eventId = 'bus_on_initial_screen';
      break;
    case SearchState.SEARCHING:
      eventId = 'bus_searching_address';
      break;
    case SearchState.GET_RESULT:
      eventId = 'bus_view_search_address_result';
      break;
  }

  if (eventId) {
    Firebase.setScreen(eventId); // each state also be the small screen, track screen to view avg time of each state.
    Firebase.track(eventId);
  }
}
