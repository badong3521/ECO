import { Keyboard, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScheduleType } from '../../../../../../../../services/api/types/direction';
import styles from './style.css';
import { useBusState } from '../../../../../../reducers';
import DirectionApi from '../../../../../../../../services/api/direction';
import Loader from '../../../../../../../../components/Loader';
import { applicationColors } from '../../../../../../../../../style.css';
import ListBusRoutes from './ListBusRoutes';
import { SearchbarType } from '../../../../../../types';
import { useSearchHistoryState } from '../../../../../../../../components/SearchBar/reducers/searchHistory';
import SearchingHistoryListContent from '../../../../../../../../components/SearchHistoryListContent';
import { generateMarkersFromSchedules } from '../../../../../../utils';
import { useUserState } from '../../../../../../../User/reducers';
import { PolylineType } from '../../../../../../../../components/Map/components/Polyline';

interface SearchFromDepartureContentProps {
  isSearching: boolean;
  onSubmitSearch: (text: string, type: SearchbarType) => void;
}

// Show the result of the search from a departure to a destination: the available routes
// When user is searching, the result will be the search history.
export default function SearchFromDepartureContent(
  props: SearchFromDepartureContentProps,
) {
  const { isSearching, onSubmitSearch } = props;
  const [historyState] = useSearchHistoryState();
  const [busState, busActions] = useBusState();
  const directionApi = new DirectionApi();
  const [schedules, setSchedules] = useState<ScheduleType[]>();
  const [loading, setLoading] = useState(false);
  const [userState] = useUserState();

  function onSearchHistoryItemPress(text: string) {
    if (busState.searchBarType === 'departure') {
      busActions.setDepartureLocation({
        coordinates: undefined,
        address: text,
      });
    } else {
      busActions.setDestinationLocation({
        coordinates: undefined,
        address: text,
      });
    }
    Keyboard.dismiss();
    onSubmitSearch(text, busState.searchBarType);
  }

  function onItemSchedulePress(schedule: ScheduleType) {
    busActions.setSelectedBusRoute(schedule.path.route);
    busActions.setSelectedBusStop(schedule.path.stopDestination);
    busActions.pushBusDrawerState('view_trip_details');
  }

  async function fetchRoutesToDestination() {
    if (
      busState.departureLocation?.coordinates &&
      busState.destinationLocation?.coordinates
    ) {
      setLoading(true);
      const response = await directionApi.searchDirection({
        departure: busState.departureLocation!.coordinates,
        destination: busState.destinationLocation!.coordinates,
      });
      setLoading(false);
      if (response.status === 'success') {
        setSchedules(response.result.data.schedules);
      } else {
        setSchedules([]);
      }
    }
  }

  // generate markers and polylines
  useEffect(() => {
    if (schedules) {
      busActions.setMarkers(
        generateMarkersFromSchedules(
          schedules,
          userState.userLanguage,
          busState.destinationLocation,
        ),
      );
      const polylines: PolylineType[][] = [];
      schedules.forEach(schedule => {
        if (schedule.decodedPolyline) {
          polylines.push(schedule.decodedPolyline![0]);
        }
      });
      busActions.setPolylines(polylines.reverse());
    }
  }, [schedules]);

  useEffect(() => {
    fetchRoutesToDestination();
  }, [busState.departureLocation, busState.destinationLocation]);

  return (
    <View style={styles.container}>
      {loading && <Loader color={applicationColors.primary.shade900} />}
      {isSearching ? (
        <SearchingHistoryListContent
          histories={historyState.busSearchHistories}
          onSearchHistoryItemPress={onSearchHistoryItemPress}
        />
      ) : (
        <ListBusRoutes
          schedules={schedules}
          onItemSchedulePress={onItemSchedulePress}
        />
      )}
    </View>
  );
}
