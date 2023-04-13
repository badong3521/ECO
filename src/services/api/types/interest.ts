import { ApiResType } from './api';

export type Interest = {
  name: {
    en: string;
    vn: string;
  };
  photo: string;
};

export type InterestCategory = {
  name: {
    en: string;
    vn: string;
  };
  interests: Interest[];
};

export type FetchInterestType = ApiResType<InterestCategory[]>;
