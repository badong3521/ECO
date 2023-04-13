import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';
import { ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  SearchState,
  useStandardSearchState,
} from '../../../../reducers/standardSearch';
import { LocationType } from '../../../../../../services/api/types/bus';
import { useBusState } from '../../../../reducers';
import FavoriteLocationApi from '../../../../../../services/api/favoriteLocation';
import { useUserState } from '../../../../../User/reducers';
import DirectionApi from '../../../../../../services/api/direction';
import { useMapState } from '../../../../../../components/Map/reducers';
import { FavoriteLocationParamType } from '../../../../../../services/api/types/favoriteLocation';
import ShortcutBar from '../../../../../../components/ShortcutBar';
import Firebase from '../../../../../../services/firebase';

type BusShortcutBarPropTypes = {
  editable?: boolean;
  showIfAllDefined?: boolean;
  navigation: any;
  style?: ViewStyle | ViewStyle[];
};

function BusShortcutBar(props: BusShortcutBarPropTypes) {
  const { i18n } = useTranslation();
  const { editable, navigation, showIfAllDefined, style } = props;
  const [busState, busActions] = useBusState();
  const { defaultShortcuts } = busState;
  const [standardSearchState, standardSearchActions] = useStandardSearchState();
  const [userState] = useUserState();
  const { favoriteBusLocations } = userState;
  const directionApi = new DirectionApi();
  const favoriteLocationApi = new FavoriteLocationApi();
  const [mapState] = useMapState();
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [allDefined, setAllDefined] = useState<boolean>(true);

  const setShortcutButtonTitle = (shortcutName: string): string => {
    return `${i18n.t('features.busScreen.shortcuts.set')} ${i18n
      .t(`features.busScreen.shortcuts.${shortcutName}`)
      .toLowerCase()}`;
  };

  function generateShortcutButtons() {
    let canEditCheck = false;
    // for deciding whether to show the shortcut bar in the situation where the shortcut bar is only allowed to appear
    // if all of the predefined shortcuts are set
    let allDefinedCheck = true;
    const res = defaultShortcuts.map(shortcut => {
      // check if any of the predefined shortcuts is set
      // if so, allow user to edit
      const temp = favoriteBusLocations?.find(
        location => location.name === shortcut,
      );
      if (temp) {
        canEditCheck = true;
        return {
          title: i18n.t(`features.busScreen.shortcuts.${temp.name}`),
          icon: temp.name,
          onPress: () => onDefinedShortcutPress(temp.name),
        };
      }
      allDefinedCheck = false;
      return {
        title: setShortcutButtonTitle(shortcut),
        icon: shortcut,
        onPress: () => onUndefinedShortcutPress(shortcut),
      };
    });
    if (canEditCheck !== canEdit) setCanEdit(canEditCheck);
    if (allDefinedCheck !== allDefined) setAllDefined(allDefinedCheck);
    return res;
  }

  const onShortcutEditPress = () => navigation.navigate('BusShortcutScreen');

  function onDefinedShortcutPress(name: string) {
    if (name === 'home') {
      Firebase.track('bus_home_shortcut_press');
    } else if (name === 'work') {
      Firebase.track('bus_work_shortcut_press');
    }
    searchDirection(
      favoriteBusLocations!.find(location => location.name === name)!.location,
    );
  }

  async function onUndefinedShortcutPress(name: string) {
    if (
      busState.busDrawerStatesStack[0] === 'standard_search' &&
      standardSearchState.searchState === SearchState.GET_RESULT
    ) {
      await addFavoriteLocation(name);
    } else {
      navigation.setParams({ isEditingBusShortcuts: false });
      standardSearchActions.setSearchState(SearchState.SEARCHING);
      busActions.setEditingShortcut(name);
    }
  }

  async function searchDirection(location: LocationType) {
    const response = await directionApi.searchDirection({
      departure: [mapState.latitude, mapState.longitude],
      destination: [location.latitude!, location.longitude!],
    });
    if (response.status === 'success') {
      busActions.setSelectedBusRoute(
        response.result.data.schedules[0].path.route,
      );
      busActions.setSelectedBusStop(
        response.result.data.schedules[0].path.stopDestination,
      );
      busActions.pushBusDrawerState('view_trip_details');
    } else {
      const locationWithCoords = {
        ...location,
        coordinates: [location.latitude!, location.longitude!],
      };
      onGoSearchToDestination(locationWithCoords);
    }
  }

  function onGoSearchToDestination(location?: LocationType) {
    busActions.setDestinationLocation(
      location || standardSearchState.addressInfo.location,
    );
    busActions.setDepartureLocation(undefined);
    busActions.setSearchBarType('departure');
    busActions.pushBusDrawerState('search_from_departure_to_destination');
  }

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

  return (
    <>
      {editable && (
        <ShortcutBar
          style={style}
          canEdit={canEdit}
          buttons={generateShortcutButtons()}
          onEditPress={() => onShortcutEditPress()}
        />
      )}
      {editable === false && (
        <ShortcutBar
          style={style}
          canEdit={false}
          buttons={generateShortcutButtons()}
          onEditPress={() => null}
        />
      )}
      {showIfAllDefined && allDefined && (
        <ShortcutBar
          style={style}
          canEdit={false}
          buttons={generateShortcutButtons()}
          onEditPress={() => null}
        />
      )}
    </>
  );
}

export default withNavigation(BusShortcutBar);
