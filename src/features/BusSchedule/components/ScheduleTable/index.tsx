import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import styles from './style.css';
import { BusRouteType } from '../../../../services/api/types/bus';
import Loader from '../../../../components/Loader';
import StopsStickyColumn from './components/StopsStickyColumn';
import TableHeader from './components/TableHeader';
import TableContent from './components/TableContent';
import { LanguageType } from '../../../User/reducers';

interface ScheduleTableProps {
  route: BusRouteType;
  language: LanguageType;
}

// Render a time table for all stops of a route
export default function ScheduleTable(props: ScheduleTableProps) {
  const { route, language } = props;
  const scrollViewRef = React.createRef<ScrollView>();

  // scroll to the start of table
  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  }, [route]);

  return route.stops ? (
    <View style={styles.container}>
      <StopsStickyColumn stops={route.stops} language={language} />
      <ScrollView horizontal ref={scrollViewRef}>
        <View style={styles.tableContainer}>
          <TableHeader stops={route.stops} />

          <TableContent stops={route.stops} />
        </View>
      </ScrollView>
    </View>
  ) : (
    <Loader />
  );
}
