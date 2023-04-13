import { ApiListResType } from './api';

export interface EcoAboutIdType {
  id: number;
}

export interface EcoCardIdsType {
  ecopark: EcoAboutIdType;
  ecotek: EcoAboutIdType;
}

export type EcoCardsIdReturnType = ApiListResType<EcoCardIdsType>;
