import React, { useEffect, useState } from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { Linking, View } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';
import { MapMarkerPropTypes } from '../../../../components/Map/components/MapMarker/types';
import { useBusState } from '../../reducers';
import Map, { MapComponentRef } from '../../../../components/Map';
import BusRouteApi from '../../../../services/api/route';
import BusLocationApi from '../../../../services/api/bus';
import useInterval from '../../../../utils/hooks/useInterval';
import styles, { mapEdgePadding } from './style.css';
import FAB from '../../../../components/FAB';
import { useMapState } from '../../../../components/Map/reducers';
import { applicationColors } from '../../../../../style.css';
import SelectingLocationIndicator from '../SelectingLocationIndicator';
import { MarkersGroupRef } from '../../../../components/Map/components/InteractiveMap';
import {
  generateMarkerFromBusLocations,
  generateMarkersFromSelectedRoute,
} from '../../utils';
import { useUserState } from '../../../User/reducers';
import {
  PermissionStatus,
  requestLocationPermission,
} from '../../../../utils/permission';
import MessageOverlay from '../../../../components/MessageOverlay';
import FABWithWarningState from '../../../../components/FABWithWarningState';

interface BusMapProps {
  navigation: any;
  mapRef: React.RefObject<MapView>;
}

const MARKER_UPDATE_INTERVAL = 5000;

// Display a Map but with the overlays required by the Bus feature
export default function BusMap(props: BusMapProps) {
  const { navigation, mapRef } = props;
  const [mapState, mapActions] = useMapState();
  const { longitude, latitude, locationPermission } = mapState;
  const busRouteApi = new BusRouteApi();
  const busLocationApi = new BusLocationApi();
  const [busState, busActions] = useBusState();
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const { busRoutes, selectedBusRoute, selectedBusStop } = busState;
  const markersGroupRef = React.useRef<MarkersGroupRef>(null);
  const [userState] = useUserState();
  const mapComponentRef = React.useRef<MapComponentRef>(null);
  const [
    showLocationPermissionWarning,
    setShowLocationPermissionWarning,
  ] = useState<boolean>(false);
  const { i18n } = useTranslation();

  function updateMarkers(markers: MapMarkerPropTypes[]) {
    if (markersGroupRef.current) {
      markersGroupRef.current.updateMarkers(markers);
    }
  }

  async function updateBusLocationsMarkers() {
    let id: number | null = null;
    if (selectedBusRoute) {
      id = selectedBusRoute.id;
    }
    const busMarkers = await fetchBusLocationsMarkers(id);
    if (busMarkers) {
      const currentMarkers: MapMarkerPropTypes[] = [];
      if (busState.markers) {
        busState.markers?.forEach(marker => {
          if (marker.markerType !== 'bus') {
            currentMarkers.push(marker);
          }
        });
      }
      updateMarkers(currentMarkers.concat(busMarkers));
    }
  }

  async function updateMarkersForSelectedRoute() {
    const stopMarkers = generateMarkersFromSelectedRoute(
      userState.userLanguage,
      busState.selectedBusRoute,
      busState.selectedBusStop,
    );
    // also fetch bus location immediately
    let id = null;
    if (busState.selectedBusRoute) {
      id = busState.selectedBusRoute.id;
    }
    const busMarkers = (await fetchBusLocationsMarkers(id)) || [];
    busActions.setMarkers(busMarkers.concat(stopMarkers));
    if (busState.selectedBusRoute?.decodedPolyline) {
      busActions.setPolylines(busState.selectedBusRoute.decodedPolyline);
    }
  }

  async function fetchAllBusRoutes() {
    await busRouteApi.fetchAllBusRoutes();
  }

  async function fetchBusLocationsMarkers(
    routeId: number | null,
  ): Promise<MapMarkerPropTypes[] | undefined> {
    const response = await busLocationApi.fetchBusLocations(routeId);
    if (response.status === 'success') {
      return generateMarkerFromBusLocations(
        response.result.data,
        selectedBusRoute,
      );
    }
    return undefined;
  }

  // Fetch bus locations of selected route every MARKER_UPDATE_INTERVAL seconds.
  useInterval({
    callback: () => {
      updateBusLocationsMarkers();
    },
    delay: isRunning ? MARKER_UPDATE_INTERVAL : null,
  });

  function onMarkerPress(marker: MapMarkerPropTypes) {
    if (marker.stop) {
      busActions.setSelectedBusStop(marker.stop);
    }
    if (marker.markerType === 'stop' && busState.selectedBusRoute) {
      busActions.pushBusDrawerState('view_stop_actions');
    }
    if (marker.markerType === 'stopWithRoutes') {
      busActions.pushBusDrawerState('view_stops_with_routes_actions');
    }
  }

  async function onMyLocationButtonPress() {
    switch (locationPermission) {
      case RESULTS.DENIED:
        requestLocationPermission(
          mapComponentRef.current!.askLocationPermissionAndWatch,
          undefined,
          mapActions.setLocationPermission,
        );
        break;
      case RESULTS.GRANTED:
        animateMapToLocation(mapRef, {
          latitude,
          longitude,
        });
        break;
      default:
        break;
    }
  }

  function onLocationPermissionWarningPress() {
    setShowLocationPermissionWarning(!showLocationPermissionWarning);
  }

  function onPermissionNotGranted(res: PermissionStatus) {
    mapActions.setLocationPermission(res);
  }

  async function onWarningMessagePress() {
    await Linking.openSettings();
    setShowLocationPermissionWarning(false);
  }

  // Fetch all bus routes if we don't have any
  useEffect(() => {
    if (!busRoutes) {
      fetchAllBusRoutes();
    }
  }, [busRoutes?.length]);

  // toggle isRunning when navigating out of the map for performance concern
  useEffect(() => {
    const willBlurListener = navigation.addListener('willBlur', () => {
      setIsRunning(false);
    });
    const willFocusListener = navigation.addListener('willFocus', () => {
      setIsRunning(true);
    });

    return function cleanup() {
      willBlurListener.remove();
      willFocusListener.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (selectedBusStop) {
      animateMapToLocation(mapRef, selectedBusStop);
      if (markersGroupRef.current) {
        markersGroupRef.current.showMarkerCallout(selectedBusStop.id);
      }
    }
  }, [selectedBusStop]);

  // update markers and fit map to markers
  useEffect(() => {
    updateMarkers(busState.markers || []);
    if (busState.markers) {
      if (busState.busDrawerState === 'standard_search') {
        const destination = busState.markers.find(
          marker => marker.markerType === 'destination',
        );
        if (destination) {
          fitMapToMarkers(mapRef, [destination]);
        }
      } else {
        fitMapToMarkers(mapRef, busState.markers);
      }
    }
  }, [busState.markers]);

  useEffect(() => {
    if (markersGroupRef.current) {
      markersGroupRef.current.updatePolylines(busState.polylines);
    }
  }, [busState.polylines]);

  // generate markers and polyline for selected busRoute
  useEffect(() => {
    if (busState.busDrawerState === 'view_route_details') {
      updateMarkersForSelectedRoute();
    }
  }, [busState.selectedBusRoute]);

  useEffect(() => {
    updateBusLocationsMarkers();
  }, []);

  return (
    <>
      <Map
        markersGroupRef={markersGroupRef}
        mapRef={mapRef}
        onMarkerPress={onMarkerPress}
        permissionBlockedCallback={onPermissionNotGranted}
        permissionDeniedCallback={onPermissionNotGranted}
        mapComponentRef={mapComponentRef}
      />
      <View style={styles.settingsButton}>
        <FAB
          icon="local-activity"
          onPress={() => navigation.navigate('BusCardScreen')}
          iconSize={26}
          color={applicationColors.primary.shade900}
          label={i18n.t('features.busScreen.busCardScreen.busCard')}
          style={styles.busCardFab}
          labelStyle={styles.busCardFabLabel}
        />
      </View>
      <View style={styles.floatings}>
        <FAB
          onPress={() => navigation.navigate('BusScheduleScreen')}
          icon="event-note"
          label={i18n.t('features.busScheduleScreen.scheduleButton')}
          iconSize={26}
          style={styles.scheduleFab}
        />
        <FABWithWarningState
          showWarning={locationPermission === RESULTS.BLOCKED}
          onButtonPress={onMyLocationButtonPress}
          onWarningPress={onLocationPermissionWarningPress}
          style={styles.floatingMyLocationButton}
          icon="my-location"
          color={applicationColors.semantic.info.shade500}
          eventId="current_location"
        />
      </View>
      {busState.isSelectingLocation && <SelectingLocationIndicator />}
      <MessageOverlay
        visible={showLocationPermissionWarning}
        message={i18n.t('features.busScreen.locationPermission')}
        onPress={onWarningMessagePress}
        onBlur={() => setShowLocationPermissionWarning(false)}
        messageContainerStyle={styles.warningMessageContainer}
      />
    </>
  );
}

// Use ref to zoom map out to fit the markers
function fitMapToMarkers(
  ref: React.RefObject<any>,
  markers?: MapMarkerPropTypes[],
) {
  if (markers && markers.length > 0 && ref && ref.current) {
    // if markers only has 1 item, use animate to 1 location instead of fit map to a marker
    // because it will has small padding to a marker
    if (markers.length === 1) {
      animateMapToLocation(ref, markers[0]);
    } else {
      ref.current.fitToCoordinates(
        markers.filter(marker => marker.markerType !== 'bus'),
        { edgePadding: mapEdgePadding, animated: true },
      );
    }
  }
}

function animateMapToLocation(
  mapRef: React.RefObject<MapView>,
  latLng?: LatLng,
) {
  if (mapRef && mapRef.current && latLng) {
    mapRef.current.animateToRegion({
      latitude: latLng.latitude,
      longitude: latLng.longitude,
      longitudeDelta: 0.01,
      latitudeDelta: 0.01,
    });
  }
}
