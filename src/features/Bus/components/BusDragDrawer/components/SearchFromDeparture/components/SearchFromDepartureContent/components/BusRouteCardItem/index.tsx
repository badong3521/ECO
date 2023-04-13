import { View } from 'react-native';
import * as React from 'react';
import { itemContainer, styles } from './style.css';
import IconComponent from '../../../../../../../../../../components/Icon';
import Text from '../../../../../../../../../../components/Text';
import {
  applicationColors,
  applicationIcons,
} from '../../../../../../../../../../../style.css';
import { ScheduleType } from '../../../../../../../../../../services/api/types/direction';
import TouchableComponent from '../../../../../../../../../../components/TouchableComponent';
import StopInfo from '../StopInfo';
import { useUserState } from '../../../../../../../../../User/reducers';

const initArriveTimes: string[] = [];

export interface BusRouteCardItemProps {
  index: number;
  itemsCount: number;
  schedule: ScheduleType;
  onItemPress: (schedule: ScheduleType) => void;
}

// Show as a Card, content includes a bus Route, a stop departure, and a stop destination
// This is an item in `SearchFromDepartureContent` list
export default function BusRouteCardItem(props: BusRouteCardItemProps) {
  const { schedule, onItemPress, index, itemsCount } = props;
  const [userState] = useUserState();
  const onPress = () => onItemPress(schedule);

  const {
    length,
    0: arriveTimeDeparture,
    [length - 1]: arriveTimeDestination,
  } = schedule.arrivalTimes ? schedule.arrivalTimes : initArriveTimes;

  return (
    <TouchableComponent onPress={onPress}>
      <View style={[itemContainer(index, itemsCount)]}>
        <View style={styles.leftContainer}>
          <View style={styles.topIndicator} />
          <View style={styles.bottomIndicator} />

          <View style={styles.connectLine} />

          <View style={styles.routeNameContainer}>
            <Text style={styles.routeName}>
              {schedule.path.route.routeCode}
            </Text>
          </View>
        </View>

        <View>
          <StopInfo
            stop={schedule.path.stopDeparture}
            userLanguage={userState.userLanguage}
            style={styles.stopNameContainerDeparture}
            arriveTime={arriveTimeDeparture}
          />
          <StopInfo
            stop={schedule.path.stopDestination}
            userLanguage={userState.userLanguage}
            style={styles.stopNameContainerDestination}
            arriveTime={arriveTimeDestination}
          />
        </View>

        <View style={styles.rightIcon}>
          <IconComponent
            size={20}
            name={applicationIcons.arrowRight}
            color={applicationColors.primary.shade900}
          />
        </View>
      </View>
    </TouchableComponent>
  );
}
