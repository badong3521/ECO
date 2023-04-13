import { ApiResType, Multilanguage } from './api';
import { PolylineType } from '../../../components/Map/components/Polyline';

export interface RouteMetadata {
  polyline: any[];
}

export interface Stop {
  id: number;
  name: Multilanguage;
  stopType: string;
  latitude: number;
  longitude: number;
  isEcopark: string;
  routes?: BusRouteType[];
  times: string[];
}

export interface BusRouteType {
  id: number;
  routeCode: string;
  name: string;
  description: string;
  metadata?: RouteMetadata;
  stops: Stop[];
  decodedPolyline?: PolylineType[][];
  note?: Multilanguage;
  maxTimeColumns?: number; // save the max column of time of all stops
}

export interface BusLocationType {
  bus: BusType;
  latitude: number;
  longitude: number;
  direction: number;
}

export interface BusType {
  id: number;
  licensePlate: string;
  routes: string[];
}

export type LocationType = {
  address?: string;
  coordinates?: number[];
  id?: number;
  longitude?: number;
  latitude?: number;
};

export type AddressInfoType = {
  location?: LocationType;
  stops?: Stop[];
};

export type BusSchedulesType = {
  availableRoutes?: BusRouteType[];
  route: BusRouteType;
};

export type BusRouteDetailReturnType = ApiResType<BusRouteType>;

export type FetchBusLocationType = ApiResType<BusLocationType[]>;

export type FetchBusSchedulesType = ApiResType<BusSchedulesType>;

export interface BusCardPriceType {
  id: number;
  name: string;
  description: string;
  cardType: string;
  price: number;
  credit: string;
  expireDate: string;
}

export type FetchBusCardPriceType = ApiResType<BusCardPriceType[]>;
export type SearchAddressType = ApiResType<AddressInfoType>;
