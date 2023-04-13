import { FlatList, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../../../../../../../../components/Text';
import styles from '../style.css';
import BusRouteCardItem from '../components/BusRouteCardItem';
import { ScheduleType } from '../../../../../../../../../services/api/types/direction';

interface ListBusRoutesProps {
  schedules?: ScheduleType[];
  onItemSchedulePress: (schedule: ScheduleType) => void;
}

export default function ListBusRoutes(props: ListBusRoutesProps) {
  const { schedules, onItemSchedulePress } = props;
  const int18 = useTranslation();
  return (
    <View>
      <Text style={styles.label} bold="bold">
        {int18.t('features.busScreen.searchDestination.selectARoute')}
      </Text>
      {schedules && schedules.length > 0 ? (
        <FlatList
          data={schedules}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <BusRouteCardItem
              index={item.index}
              itemsCount={schedules.length}
              onItemPress={onItemSchedulePress}
              schedule={item.item}
            />
          )}
        />
      ) : (
        <Text style={styles.noData}>
          {int18.t('features.busScreen.searchDestination.noData')}
        </Text>
      )}
    </View>
  );
}
