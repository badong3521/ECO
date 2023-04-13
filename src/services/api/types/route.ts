import { ApiListResType, ApiResType, Multilanguage } from './api';
import { BusRouteType } from './bus';

export interface StopScheduleType {
  id: number;
  name: Multilanguage;
  type: string;
  arriveTime: string;
}

export interface RouteTripType {
  arriveTime: string;
  stops: StopScheduleType[];
}

export interface BusRouteScheduleType {
  arriveTimes: string[];
  trips: RouteTripType[];
}

export type FetchBusRouteType = ApiResType<BusRouteType[]>;
export type BusRouteScheduleResType = ApiListResType<BusRouteScheduleType>;
