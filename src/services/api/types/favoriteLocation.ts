import { LocationType } from './bus';
import { ApiResType } from './api';

export type FavoriteLocationType = {
  id: number;
  name: string;
  location: LocationType;
};

export type FavoriteLocationParamType = {
  name: string;
  origin: string;
  address: string;
  longitude: number;
  latitude: number;
};

export type FetchFavoriteLocationType = ApiResType<FavoriteLocationType[]>;
export type AddFavoriteLocationType = ApiResType<FavoriteLocationType>;
