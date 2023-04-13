import React, { useEffect, useImperativeHandle } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import { AppState } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import InteractiveMap, { MarkersGroupRef } from './components/InteractiveMap';
import { useMapState } from './reducers';
import { MapMarkerPropTypes } from './components/MapMarker/types';
import {
  checkLocationPermission,
  PermissionStatus,
  requestLocationPermission,
} from '../../utils/permission';

export interface MapComponentRef {
  askLocationPermissionAndWatch: () => void;
}

export interface MapPropTypes {
  markersGroupRef?: React.RefObject<MarkersGroupRef>;
  mapRef?: React.RefObject<MapView>;
  onMarkerPress?: (marker: MapMarkerPropTypes) => void;
  permissionDeniedCallback?: (param: PermissionStatus) => void;
  permissionBlockedCallback?: (param: PermissionStatus) => void;
  mapComponentRef?: React.RefObject<MapComponentRef>;
}

// Wrapper for InteractiveMap that sets up the presentational component
export default function Map(props: MapPropTypes) {
  const {
    markersGroupRef,
    mapRef,
    onMarkerPress,
    permissionDeniedCallback,
    permissionBlockedCallback,
    mapComponentRef,
  } = props;
  const [mapState, mapActions] = useMapState();
  const { latitude, longitude } = mapState;
  let locWatchId: number; // ID of location watcher for cleanup

  // Watch the user's position and update in redux on change
  // Requires permission given
  function watchUserPosition() {
    locWatchId = Geolocation.watchPosition(
      (position: any) => {
        mapActions.setGeolocationData(position.coords);
      },
      (err: any) => {
        console.log(err.message);
      },
      {
        enableHighAccuracy: true, // Use GPS over Wifi location
        timeout: 20000,
        distanceFilter: 20, // How many meters before requesting new location
      },
    );
  }

  function checkLocationPermissionOnLoad() {
    checkLocationPermission((res: PermissionStatus) => {
      mapActions.setLocationPermission(res);
      onLoadPermissionLocationCheckHandler(res);
    });
  }

  function onLoadPermissionLocationCheckHandler(res: PermissionStatus) {
    switch (res) {
      case RESULTS.DENIED:
        requestLocationPermission(
          askLocationPermissionAndWatch,
          permissionDeniedCallback,
          permissionBlockedCallback,
        );
        break;
      case RESULTS.GRANTED:
        watchUserPosition();
        break;
      default:
        break;
    }
  }

  // Ask for user permission to use location
  async function askLocationPermissionAndWatch() {
    Geolocation.getCurrentPosition(
      (position: any) => {
        mapActions.setGeolocationData(position.coords);
        mapActions.setLocationPermission(RESULTS.GRANTED);
        watchUserPosition();
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  useEffect(() => {
    checkLocationPermissionOnLoad();
    return function cleanup() {
      // Remove our location watcher to reducer power and data consumption
      Geolocation.clearWatch(locWatchId);
    };
  }, []);

  function onAppStateChange() {
    checkLocationPermission(res => {
      mapActions.setLocationPermission(res);
      if (res === RESULTS.GRANTED) {
        askLocationPermissionAndWatch();
      }
    });
  }

  // handle the event where users switch to settings and change location permission for the app
  useEffect(() => {
    AppState.addEventListener('change', onAppStateChange);
    return () => {
      AppState.removeEventListener('change', onAppStateChange);
    };
  }, []);

  // expose watchUserPosition to parent component so that it can request location permission manually
  useImperativeHandle(
    mapComponentRef,
    (): MapComponentRef => ({
      askLocationPermissionAndWatch: () => {
        askLocationPermissionAndWatch();
      },
    }),
  );

  return (
    <InteractiveMap
      latitude={latitude}
      longitude={longitude}
      markersGroupRef={markersGroupRef}
      mapRef={mapRef}
      onMarkerPress={onMarkerPress}
    />
  );
}
