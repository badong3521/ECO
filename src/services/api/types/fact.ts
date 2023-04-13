import { ApiResType, Multilanguage } from './api';

export interface Fact {
  fact: Multilanguage;
}

export type FetchFactsType = ApiResType<Fact>;
