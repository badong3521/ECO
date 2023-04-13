import { ApiResType } from './api';
import { BusRouteType, Stop } from './bus';
import { PolylineType } from '../../../components/Map/components/Polyline';

export type Bus = {
  licensePlate: string;
  gpsDeviceId: string;
};

export type PathType = {
  route: BusRouteType;
  stopDeparture: Stop;
  stopDestination: Stop;
  stopsBetween: Stop[];
};

export type ScheduleType = {
  departureTimeUtc: string;
  estimatedTravelTimeMin: number;
  bus: Bus;
  path: PathType;
  arrivalTimes: string[];
  laterDepartureTimesUtc: string[];
  decodedPolyline?: PolylineType[][];
};

export type SearchDirectionsType = {
  queryTimeUtc: string;
  schedules: ScheduleType[];
};

export type SearchDirectionsSuccessType = ApiResType<SearchDirectionsType>;
