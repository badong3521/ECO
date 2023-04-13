import { View } from 'react-native';
import * as React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import IconComponent from '../../../../../../../../components/Icon';
import Text from '../../../../../../../../components/Text';
import styles from './style.css';
import TouchableComponent from '../../../../../../../../components/TouchableComponent';
import { StopScheduleType } from '../../../../../../../../services/api/types/route';
import { LanguageType } from '../../../../../../../User/reducers';
import { StopStyleType } from '../../../../../../types';
import LeftConnectLineIndicator from '../LeftConnectLineIndicator';
import MoreStopsLabel from '../MoreStopsLabel';
import BusStopScheduleItemType from '../../type';

interface BusStopScheduleItemProps {
  type: BusStopScheduleItemType;
  onToggleDrawer: () => void;
  stopSchedule: StopScheduleType;
  userLanguage: LanguageType;
  moreStops: number;
  int18: UseTranslationResponse;
  firstOrLast: boolean;
}

// show stop's information: stop type, stop name and arrive time
export default function BusStopScheduleItem(props: BusStopScheduleItemProps) {
  const {
    type,
    onToggleDrawer,
    stopSchedule,
    userLanguage,
    moreStops,
    int18,
    firstOrLast,
  } = props;

  return (
    <TouchableComponent onPress={onToggleDrawer}>
      <View style={styles.container}>
        <LeftConnectLineIndicator type={type} />

        {type !== BusStopScheduleItemType.HIDDEN ? (
          <View style={styles.row}>
            <IconComponent
              size={16}
              name={StopStyleType.get(stopSchedule.type).icon}
              color={StopStyleType.get(stopSchedule.type).color}
            />
            <Text
              fontSize="small"
              style={[
                styles.stopName,
                {
                  color: !firstOrLast
                    ? StopStyleType.get(stopSchedule.type).color
                    : undefined,
                },
              ]}
              bold={firstOrLast ? 'bold' : undefined}
            >
              {stopSchedule.name[userLanguage]}
            </Text>
            <Text
              fontSize="small"
              bold="bold"
              style={{ color: StopStyleType.get(stopSchedule.type).color }}
            >
              {stopSchedule.arriveTime}
            </Text>
          </View>
        ) : (
          <MoreStopsLabel i18n={int18} moreStopsCount={moreStops} />
        )}
        <View style={styles.divider} />
      </View>
    </TouchableComponent>
  );
}
