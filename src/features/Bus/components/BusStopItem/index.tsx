import { View } from 'react-native';
import React from 'react';
import popupStyles from '../BusDragDrawer/components/RouteDetailsHeader/style.css';
import IconComponent from '../../../../components/Icon';
import { applicationDimensions } from '../../../../../style.css';
import Text from '../../../../components/Text';
import { Stop } from '../../../../services/api/types/bus';
import TouchableComponent from '../../../../components/TouchableComponent';
import { StopStyleType } from '../../types';
import { LanguageType } from '../../../User/reducers';

interface BusStopItemProps {
  stop: Stop;
  lang: LanguageType;
  onBusStopPress: (stop: Stop) => void;
}

// It is the component to render the bus's stop info with the icon type and stop's name.
// After click, it will bring user to bus's stop detail
export default function BusStopItem(props: BusStopItemProps) {
  const { stop, lang, onBusStopPress } = props;

  function onPress() {
    onBusStopPress(stop);
  }

  return stop === undefined ? (
    <View />
  ) : (
    <TouchableComponent onPress={onPress}>
      <View style={popupStyles.itemContainer}>
        <IconComponent
          size={applicationDimensions.iconSize}
          name={StopStyleType.get(stop.stopType).icon}
          color={StopStyleType.get(stop.stopType).color}
        />
        <Text style={popupStyles.itemRouteName} fontSize="small">
          {stop.name[lang]}
        </Text>
      </View>
    </TouchableComponent>
  );
}
