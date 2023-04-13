import { ApiResType } from './api';
import { CardType } from '../../../components/Card/types';

export interface LixiStatusType {
  showBanner: boolean;
  canPlay: boolean;
  countDown: number;
  lixiTotal: number;
}

export type FetchLixiStatusRes = ApiResType<LixiStatusType>;
export type FetchLixiRes = ApiResType<CardType>;
