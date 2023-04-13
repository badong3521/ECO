import { ApiResType } from './api';

export interface RegionType {
  name: string;
  code: string;
  id: number;
  photo: string;
}

export type FetchRegionType = ApiResType<RegionType[]>;
