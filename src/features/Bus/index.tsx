import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import styles from './style.css';
import BusMap from './components/BusMap';
import BusDragDrawer from './components/BusDragDrawer';
import useStatusBar from '../../utils/hooks/useStatusBar';

interface BusLandingScreenPropTypes {
  navigation: any;
}

// Landing page for Bus feature
export default function BusLandingScreen(props: BusLandingScreenPropTypes) {
  const { navigation } = props;
  const mapRef = React.createRef<MapView>();

  useStatusBar('dark-content');

  return (
    <View style={styles.busContentContainer}>
      <BusMap navigation={navigation} mapRef={mapRef} />
      <BusDragDrawer mapRef={mapRef} />
    </View>
  );
}
