import * as React from 'react';
import { View } from 'react-native';
import Text from '../../../../../../../../components/Text';
import IconComponent from '../../../../../../../../components/Icon';
import styles, { routeContainer, routeName } from './style.css';
import TouchableComponent from '../../../../../../../../components/TouchableComponent';
import { Stop } from '../../../../../../../../services/api/types/bus';
import { StopStyleType } from '../../../../../../types';
import { LanguageType } from '../../../../../../../User/reducers';

interface BusStopScheduleItemProps {
  stop: Stop;
  lang: LanguageType;
  onStopItemPress: (stop: Stop) => void;
}

// Use this component to show stop's info in a vertical list
export default function BusStopScheduleItem(props: BusStopScheduleItemProps) {
  const { stop, lang, onStopItemPress } = props;

  const onItemPress = () => {
    onStopItemPress(stop);
  };

  return (
    <TouchableComponent onPress={onItemPress}>
      <View style={styles.container}>
        <Text fontSize="small" style={styles.stopName}>
          {stop.name[lang]}
        </Text>
        <View style={styles.routes}>
          {stop.routes?.map(item => {
            return (
              <View
                style={routeContainer(StopStyleType.get(stop.stopType).color)}
              >
                <Text
                  fontSize="small"
                  style={routeName(StopStyleType.get(stop.stopType).color)}
                >
                  {item.routeCode}
                </Text>
                <IconComponent
                  size={12}
                  name={StopStyleType.get(stop.stopType).icon}
                  color={StopStyleType.get(stop.stopType).color}
                />
              </View>
            );
          })}
        </View>
      </View>
    </TouchableComponent>
  );
}
