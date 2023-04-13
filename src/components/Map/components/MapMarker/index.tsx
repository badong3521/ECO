import { Callout, Marker } from 'react-native-maps';
import React from 'react';
import { View } from 'react-native';
import { Polygon, Svg } from 'react-native-svg';
import { MapMarkerPropTypes, MarkerType } from './types';
import styles from './style.css';
import { applicationColors } from '../../../../../style.css';
import Text from '../../../Text';
import IconComponent from '../../../Icon';
import BusMarkerSvg from '../../../../assets/bus/svg/bus_marker.svg';
import BusStopMarkerSvg from '../../../../assets/bus/svg/bus_stop_marker.svg';

const SQUARE_SIDE = 10;

interface MapMarkerProps {
  marker: MapMarkerPropTypes;
  onPress: () => void;
  markerRef: React.RefObject<Marker>;
}

export default function MapMarker(props: MapMarkerProps) {
  const { marker, onPress, markerRef } = props;
  const {
    id,
    latitude,
    longitude,
    color,
    markerType,
    opacity,
    callout,
    rotation,
  } = marker;

  return (
    <Marker
      key={id}
      ref={markerRef}
      coordinate={{ latitude, longitude }}
      tracksViewChanges={false}
      onPress={onPress || undefined}
      rotation={rotation}
    >
      {getMarkerIcon(markerType, opacity, color)}
      <Callout tooltip>
        <View style={styles.container}>
          <View style={styles.bubble}>
            <Text style={styles.calloutText}>{callout || ''}</Text>
          </View>

          <Svg
            height={(SQUARE_SIDE * Math.sqrt(2)) / 2}
            width={SQUARE_SIDE * Math.sqrt(2)}
          >
            <Polygon
              points={`0,0 ${SQUARE_SIDE * Math.sqrt(2)},0 ${(SQUARE_SIDE *
                Math.sqrt(2)) /
                2},${(SQUARE_SIDE * Math.sqrt(2)) / 2}`}
              fill={applicationColors.neutral.shade900}
            />
          </Svg>
        </View>
      </Callout>
    </Marker>
  );
}

function getMarkerIcon(
  markerType: MarkerType,
  opacity?: number,
  color?: string,
): React.ReactNode {
  switch (markerType) {
    case 'destination':
      return (
        <IconComponent
          name="place"
          color={applicationColors.semantic.error.shade500}
          size={30}
        />
      );
    case 'stop':
      return <BusStopMarkerSvg opacity={opacity} fill={color} />;
    case 'stopWithRoutes':
      return <BusStopMarkerSvg opacity={opacity} fill={color} />;
    case 'bus':
      return <BusMarkerSvg />;
    default:
      return undefined;
  }
}
