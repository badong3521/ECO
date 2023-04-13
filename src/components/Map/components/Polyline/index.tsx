import React from 'react';
import { Polyline as MPolyline } from 'react-native-maps';
import styles from './style.css';

export interface PolylineType {
  latitude: number;
  longitude: number;
}

interface PolylineProps {
  coordinates: PolylineType[];
  color?: string;
}

// Displays a polyline used for the Map component.
// See: https://github.com/react-native-community/react-native-maps/blob/master/docs/polyline.md
export default function Polyline(props: PolylineProps) {
  const { coordinates, color } = props;

  return (
    <MPolyline
      coordinates={coordinates}
      strokeColor={color || styles.stroke}
      strokeWidth={styles.width}
    />
  );
}
