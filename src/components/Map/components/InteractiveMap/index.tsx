import React, { useImperativeHandle, useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapConfig from '../../../../config/map';
import styles from './style.css';
import Polyline, { PolylineType } from '../Polyline';
import { MapMarkerPropTypes } from '../MapMarker/types';
import MapMarker from '../MapMarker';
import { applicationColors } from '../../../../../style.css';
import Firebase from '../../../../services/firebase';

export interface MarkersGroupRef {
  updateMarkers: (markers: MapMarkerPropTypes[]) => void;
  updatePolylines: (polylines?: PolylineType[][]) => void;
  showMarkerCallout: (id: number) => void;
}

// Decide on how zoomed out the map should be at render
const { width, height } = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0622;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let markerRefs: React.RefObject<Marker>[] = [];

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  mapRef?: React.RefObject<MapView>;
  markersGroupRef?: React.RefObject<MarkersGroupRef>;
  onMarkerPress?: (marker: MapMarkerPropTypes) => void;
}

// Displays a Google Map element that can take in child element markers
export default function InteractiveMap(props: InteractiveMapProps) {
  const { latitude, longitude, markersGroupRef, mapRef, onMarkerPress } = props;
  const [markers, setMarkers] = useState<MapMarkerPropTypes[]>([]);
  const [polylines, setPolylines] = useState<PolylineType[][]>();
  const [mapReady, setMapReady] = useState<boolean>(false);

  // Set a region based on user's initial location
  const region = {
    latitude,
    longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  function renderMarkersAndPolylines() {
    if (mapReady) {
      return (
        <>
          {markers.map((marker: MapMarkerPropTypes, index) => (
            <MapMarker
              markerRef={markerRefs[index]}
              marker={marker}
              onPress={() => {
                Firebase.track('bus_marker_press', {
                  type: marker.markerType,
                  value: String(marker.id),
                });
                if (onMarkerPress) {
                  onMarkerPress(marker);
                }
              }}
            />
          ))}
          {polylines &&
            polylines.map((polyline: PolylineType[], index) => (
              <Polyline
                coordinates={polyline}
                key={polyline[0].latitude}
                color={
                  index > 0
                    ? applicationColors.misc.polyline
                    : applicationColors.misc.polylineActive
                }
              />
            ))}
        </>
      );
    }
    return <></>;
  }

  useImperativeHandle(
    markersGroupRef,
    (): MarkersGroupRef => ({
      updateMarkers: mks => {
        markerRefs = [];
        if (mks) {
          mks.forEach(() => {
            markerRefs.push(React.createRef<Marker>());
          });
        }
        setMarkers(mks);
      },
      updatePolylines: (pls?: PolylineType[][]) => {
        setPolylines(pls);
      },
      showMarkerCallout: (id: number) => {
        const index = markers.findIndex(marker => marker.id === id);
        if (index > 0 && markerRefs[index]) {
          markerRefs[index].current!.showCallout();
        }
      },
    }),
  );

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapConfig}
        showsUserLocation
        initialRegion={region}
        ref={mapRef}
        showsMyLocationButton={false}
        onMapReady={() => setMapReady(true)}
      >
        {renderMarkersAndPolylines()}
      </MapView>
    </View>
  );
}
