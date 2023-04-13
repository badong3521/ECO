import { View } from 'react-native';
import * as React from 'react';
import styles from './style.css';
import Text from '../../../../../../../../components/Text';

interface RouteNameIndicatorProps {
  routeName: string;
}

// Show route name with the vertical line to connect from first to last stop
export default function RouteNameIndicator(props: RouteNameIndicatorProps) {
  const { routeName } = props;
  return (
    <View style={styles.leftContainer}>
      <View style={styles.connectLine} />
      <View style={styles.topIndicator} />
      <View style={styles.bottomIndicator} />
      <View style={styles.routeNameContainer}>
        <Text style={styles.routeName}>{routeName}</Text>
      </View>
    </View>
  );
}
