import { ApiResType } from './api';
import { CardType, CategoryType } from '../../../components/Card/types';

export interface RedeemType {
  id: number;
  redeemedAt: string;
}

export type FetchCardsType = ApiResType<CardType[]>;
export type FetchCardType = ApiResType<CardType>;
export type FetchCategoriesType = ApiResType<CategoryType[]>;
export type FetchRedeemType = ApiResType<RedeemType[]>;
export type RedeemResType = ApiResType<RedeemType>;
