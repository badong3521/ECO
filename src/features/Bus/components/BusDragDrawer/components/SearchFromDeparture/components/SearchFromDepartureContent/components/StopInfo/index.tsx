import { View, ViewStyle } from 'react-native';
import * as React from 'react';
import styles from './style.css';
import IconComponent from '../../../../../../../../../../components/Icon';
import Text from '../../../../../../../../../../components/Text';
import { Stop } from '../../../../../../../../../../services/api/types/bus';
import { StopStyleType } from '../../../../../../../../types';
import { LanguageType } from '../../../../../../../../../User/reducers';

interface StopInfoProps {
  stop: Stop;
  userLanguage: LanguageType;
  style: ViewStyle;
  arriveTime: string;
}

// Show Stop Info with stop type icon, stop name and arrive time
export default function StopInfo(props: StopInfoProps) {
  const { stop, userLanguage, style, arriveTime } = props;
  return (
    <View style={style}>
      <View style={styles.row}>
        <IconComponent
          size={16}
          name={StopStyleType.get(stop.stopType).icon}
          color={StopStyleType.get(stop.stopType).color}
        />
        <Text style={styles.stopName} numberOfLines={1} fontSize="small">
          {stop.name[userLanguage]}
        </Text>
      </View>
      <Text style={styles.arriveTime} fontSize="small">
        {arriveTime || ''}
      </Text>
    </View>
  );
}
