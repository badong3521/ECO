import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import ChipList from '../../../../../../components/ChipList';
import styles from './style.css';
import { useBusState } from '../../../../reducers';
import DirectionApi from '../../../../../../services/api/direction';
import { useMapState } from '../../../../../../components/Map/reducers';
import { ScheduleType } from '../../../../../../services/api/types/direction';
import { Stop } from '../../../../../../services/api/types/bus';
import Loader from '../../../../../../components/Loader';
import { applicationColors } from '../../../../../../../style.css';
import ListStopsTimeTable from './components/ListStopsTimeTable';
import { generateMarkersFromSchedules } from '../../../../utils';
import { useUserState } from '../../../../../User/reducers';

// Show list stops with time table at selected arrive time
// Can select a time in the ChipList to see the stops in that time.
// By default, the list stops only show the first and the last stop. Choose to expand to view all.
export default function BusStopTimeTableContent() {
  const [busState, busActions] = useBusState();
  const [mapState] = useMapState();
  const directionApi = new DirectionApi();
  const [arriveTime, setArriveTime] = useState<string>();
  const [arriveTimes, setArriveTimes] = useState<string[]>();
  const [trip, setTrip] = useState<ScheduleType>();
  const [loading, setLoading] = useState(true);
  const [userState] = useUserState();

  const isOpenDrawer = (): boolean =>
    busState.isOpenDrawer && getStopsBetweenCount() > 0;

  const onToggleDrawer = () => busActions.setIsOpenDrawer(!isOpenDrawer());

  // convert departure, destination and between stops to a list
  // set arrive time to each stop
  function parseListStops(): Stop[] {
    if (trip) {
      if (!isOpenDrawer()) {
        return [
          trip.path.stopDeparture,
          trip.path.stopDeparture,
          trip.path.stopDestination,
        ];
      }
      const stops: Stop[] = [];
      return stops.concat(
        trip.path.stopDeparture,
        trip.path.stopsBetween,
        trip.path.stopDestination,
      );
    }
    return [];
  }

  function getStopsBetweenCount(): number {
    return trip ? trip.path.stopsBetween.length : 0;
  }

  function onChangeArriveTime(index: number, time: string) {
    setArriveTime(time);
  }

  // filter to get only schedule for the selected route
  function getTripForSelectedRoute(
    trips: ScheduleType[],
  ): ScheduleType | undefined {
    return trips.find(t => t.path.route.id === busState.selectedBusRoute!.id);
  }

  function parseArriveTimes(schedule: ScheduleType | undefined) {
    if (schedule && !arriveTimes) {
      const times: string[] = [];
      setArriveTimes(
        times.concat(
          schedule.departureTimeUtc,
          schedule.laterDepartureTimesUtc,
        ),
      );
    }
  }

  function getDepartureCoordinate(): number[] {
    if (busState.departureLocation && busState.departureLocation.coordinates) {
      return [
        busState.departureLocation.coordinates![0],
        busState.departureLocation.coordinates![1],
      ];
    }
    // return current location
    return [mapState.latitude, mapState.longitude];
  }

  async function fetchTimetables() {
    if (busState.selectedBusStop && busState.selectedBusRoute) {
      setLoading(true);
      const data = await directionApi.searchDirection({
        departure: getDepartureCoordinate(),
        destination: [
          busState.selectedBusStop.latitude,
          busState.selectedBusStop.longitude,
        ],
        departureTime: arriveTime,
      });
      setLoading(false);
      if (data.status === 'success') {
        const correctTrip = getTripForSelectedRoute(data.result.data.schedules);
        setTrip(correctTrip);
        parseArriveTimes(correctTrip);
      } else {
        setTrip(undefined);
      }
    }
  }

  // generate markers and polylines
  useEffect(() => {
    if (trip) {
      busActions.setMarkers(
        generateMarkersFromSchedules(
          [trip],
          userState.userLanguage,
          busState.destinationLocation,
        ),
      );
      if (trip.decodedPolyline) {
        busActions.setPolylines(trip.decodedPolyline);
      }
    } else {
      busActions.setMarkers([]);
      busActions.setPolylines([]);
    }
  }, [trip]);

  // get listStops when arriveTime has changed
  useEffect(() => {
    fetchTimetables();
  }, [arriveTime]);

  return (
    <View>
      {loading ? (
        <View style={styles.loading}>
          <Loader color={applicationColors.primary.shade900} />
        </View>
      ) : (
        <ListStopsTimeTable
          stops={parseListStops()}
          arriveTimes={trip?.arrivalTimes}
          expanded={isOpenDrawer()}
          onToggleDrawer={onToggleDrawer}
          stopsBetweenCount={getStopsBetweenCount()}
          selectedBusRoute={busState.selectedBusRoute}
        />
      )}
      {arriveTimes && (
        <View style={styles.timeTableContainer}>
          <ChipList
            data={arriveTimes}
            displayAttribute={undefined}
            onSelectedItemChange={onChangeArriveTime}
          />
        </View>
      )}
    </View>
  );
}
