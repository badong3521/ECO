import { View } from 'react-native';
import * as React from 'react';
import styles, { container } from './style.css';
import { BusRouteType } from '../../../../../../../services/api/types/bus';
import { StopStyleType } from '../../../../../types';
import Text from '../../../../../../../components/Text';
import TouchableComponent from '../../../../../../../components/TouchableComponent';

interface BusRouteRoundedItemProps {
  stopType: string;
  route: BusRouteType;
  onRoutePress: (route: BusRouteType) => void;
}

export default function BusRouteRoundedItem(props: BusRouteRoundedItemProps) {
  const { stopType, route, onRoutePress } = props;

  const onPress = () => onRoutePress(route);

  return (
    <TouchableComponent onPress={onPress}>
      <View style={container(StopStyleType.get(stopType).color)}>
        <Text
          style={styles.routeName}
        >{`${route.routeCode} - ${route.name}`}</Text>
      </View>
    </TouchableComponent>
  );
}
