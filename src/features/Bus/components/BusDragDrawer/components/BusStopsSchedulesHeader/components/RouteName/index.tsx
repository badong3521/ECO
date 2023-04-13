import { View } from 'react-native';
import * as React from 'react';
import Text from '../../../../../../../../components/Text';
import IconComponent from '../../../../../../../../components/Icon';
import { StopStyleType } from '../../../../../../types';
import routeStyle from './style.css';

interface RouteNameProps {
  routeCode: string;
  stopType: string;
}

export default function RouteName(props: RouteNameProps) {
  const { routeCode, stopType } = props;
  return (
    <View
      style={routeStyle(StopStyleType.get(stopType).color).routeNameContainer}
    >
      <Text style={routeStyle(StopStyleType.get(stopType).color).routeName}>
        {routeCode}
      </Text>
      <IconComponent
        size={16}
        name={StopStyleType.get(stopType).icon}
        color={StopStyleType.get(stopType).color}
      />
    </View>
  );
}
