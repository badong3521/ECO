import { View } from 'react-native';
import * as React from 'react';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';
import IconComponent from '../../../../../../../../components/Icon';
import Text from '../../../../../../../../components/Text';
import styles, { stopName } from './style.css';
import { StopStyleType } from '../../../../../../types';
import { LanguageType } from '../../../../../../../User/reducers';
import { Stop } from '../../../../../../../../services/api/types/bus';
import TouchableComponent from '../../../../../../../../components/TouchableComponent';

interface BusStopTimeItemProps {
  stop: Stop;
  isMiddleItem: boolean;
  language: LanguageType;
  arriveTime?: string;
  onItemPress: () => void;
}

// Show stop info with icon, name and arrive time
export default function BusStopTimeItem(props: BusStopTimeItemProps) {
  const { stop, isMiddleItem, language, arriveTime, onItemPress } = props;
  return (
    <TouchableComponent onPress={onItemPress}>
      <View style={styles.container}>
        <IconComponent
          size={applicationDimensions.iconSize}
          name={StopStyleType.get(stop.stopType).icon}
          color={StopStyleType.get(stop.stopType).color}
        />
        <Text
          style={[
            stopName,
            {
              color: isMiddleItem
                ? StopStyleType.get(stop.stopType).color
                : applicationColors.neutral.shade900,
            },
          ]}
          bold={isMiddleItem ? undefined : 'bold'}
          fontSize="small"
          numberOfLines={1}
        >
          {stop.name[language]}
        </Text>

        <Text
          bold="bold"
          fontSize="small"
          numberOfLines={1}
          style={{
            color: StopStyleType.get(stop.stopType).color,
          }}
        >
          {arriveTime || ''}
        </Text>
      </View>
    </TouchableComponent>
  );
}
