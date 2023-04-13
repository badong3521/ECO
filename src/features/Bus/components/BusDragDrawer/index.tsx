import React, { useEffect } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import RouteDetailsHeader from './components/RouteDetailsHeader';
import RouteDetailsContent from './components/RouteDetailsContent';
import StandardSearchHeader from './components/StandardSearchHeader';
import BusLocationApi from '../../../../services/api/bus';
import { BusRouteType } from '../../../../services/api/types/bus';
import { useBusState } from '../../reducers';
import StopActionsHeader from './components/StopActionsHeader';
import SelectALocationHeader from './components/SelectALocationHeader';
import StandardSearchContent from './components/StandardSearchContent';
import {
  SearchState,
  useStandardSearchState,
} from '../../reducers/standardSearch';
import SearchFromDeparture from './components/SearchFromDeparture';
import BusStopWithRoutesHeader from './components/StopWithRoutesHeader';

import BusStopsSchedulesHeader from './components/BusStopsSchedulesHeader';
import BusStopsSchedulesContent from './components/BusStopsSchedulesContent';
import BusStopTimeTableHeader from './components/BusStopTimeTableHeader';
import BusStopTimeTableContent from './components/BusStopTimeTableContent';
import DragDrawer from '../../../../components/DragDrawer';
import FavoriteLocationApi from '../../../../services/api/favoriteLocation';
import Firebase from '../../../../services/firebase';
import { BusDrawerStateType } from '../../types';

interface BusDragDrawerProps {
  mapRef?: React.RefObject<any>;
}

// Wrapper for the DragDrawer element on the bottom of the Bus screen.
export default function BusDragDrawer(props: BusDragDrawerProps) {
  const { mapRef } = props;
  const [busState, busActions] = useBusState();
  const [standardSearchState, standardSearchActions] = useStandardSearchState();
  const busLocationApi = new BusLocationApi();
  const { busRoutes } = busState;
  const favoriteLocationApi = new FavoriteLocationApi();

  function onDrawerOpenChanged(open: boolean) {
    busActions.setIsOpenDrawer(open);
  }

  // dismiss the standard searching when drag drawer
  function onDrawerDragEnded() {
    if (
      busState.busDrawerState === 'standard_search' &&
      standardSearchState.searchState === SearchState.SEARCHING
    ) {
      Keyboard.dismiss();
      goStandard();
    }
  }

  const onGoRouteDetail = async (routeId: number) => {
    busActions.pushBusDrawerState('view_route_details');
    const res = await busLocationApi.getBusRouteDetail(routeId);
    if (res.status === 'success') {
      busActions.setSelectedBusRoute(res.result.data);
    }
  };

  const onBusRouteSelect = async (index: number, item: BusRouteType) => {
    onGoRouteDetail(item.id);
  };

  function getDrawerClosedHeight(): number | undefined {
    if (busState.busDrawerState === 'view_route_details') {
      return Dimensions.get('screen').height * 0.35;
    }
    return undefined;
  }

  function goStandard() {
    standardSearchActions.setSearchState(SearchState.NONE);
    busActions.clearToStandardState();
    busActions.replaceAllUtilBusDrawerState('standard_search');
  }

  const fetchFavoriteBusLocations = async () => {
    await favoriteLocationApi.fetchFavoriteBusLocations();
  };

  // close drawer when state changed
  // check show picking location
  // clear bus locations when show new route details
  useEffect(() => {
    trackBusStateEvent(busState.busDrawerState);
    busActions.setIsOpenDrawer(false);
    busActions.setIsSelectingLocation(
      busState.busDrawerState === 'select_a_location',
    );
    if (
      busState.busDrawerState === 'standard_search' &&
      standardSearchState.searchState === SearchState.NONE
    ) {
      standardSearchActions.setAddressInfo(undefined);
      busActions.clearToStandardState();
    }
  }, [busState.busDrawerState]);

  useEffect(() => {
    fetchFavoriteBusLocations();
  }, []);

  const renderHeader = (): React.ReactNode => {
    switch (busState.busDrawerState) {
      case 'view_route_details':
        return <RouteDetailsHeader />;
      case 'view_stop_actions':
        return <StopActionsHeader />;
      case 'select_a_location':
        return <SelectALocationHeader mapRef={mapRef} />;
      case 'view_stop_schedule':
        return <BusStopsSchedulesHeader onGoStandard={goStandard} />;
      case 'view_stops_with_routes_actions':
        return <BusStopWithRoutesHeader />;
      case 'search_from_departure_to_destination':
        return <SearchFromDeparture />;
      case 'view_trip_details':
        return <BusStopTimeTableHeader onGoStandard={goStandard} />;
      default:
        return (
          <StandardSearchHeader
            onBusRoutePress={onBusRouteSelect}
            routes={busRoutes}
          />
        );
    }
  };

  const renderContent = (): React.ReactNode => {
    switch (busState.busDrawerState) {
      case 'view_route_details':
        return <RouteDetailsContent />;
      case 'standard_search':
        return <StandardSearchContent />;
      case 'view_stop_schedule':
        return <BusStopsSchedulesContent />;
      case 'view_trip_details':
        return <BusStopTimeTableContent />;
      default:
        return null;
    }
  };

  return (
    <DragDrawer
      header={renderHeader()}
      content={renderContent()}
      onOpenChanged={onDrawerOpenChanged}
      onDragEnded={onDrawerDragEnded}
      isOpen={busState.isOpenDrawer}
      closedHeight={getDrawerClosedHeight()}
    />
  );
}

function trackBusStateEvent(busState: BusDrawerStateType) {
  if (busState !== 'standard_search') {
    Firebase.setScreen(busState); // each state also be the small screen, track screen to view avg time of each state.
    Firebase.track(busState);
  }
}
