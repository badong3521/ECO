import { ApiResType } from './api';

export interface BusCardType {
  id: number;
  cardName: string;
  cardNumber: string;
  cardArea: string;
  cardType: 'combo' | 'monthly';
  usesLeft?: number;
  daysLeft?: number;
  expiry: string;
  firstName: string;
  lastName: string;
  primary: boolean;
}

export interface BusCardV2Type {
  contractBusId: number;
  fullName: string;
  cardNumber: string;
  fromDate: string;
  toDate: string;
  ticketName: string;
  isFree: number;
  locked: number;
  numberOfAccess: number;
  amount?: number;
  month?: string;
  checked?: boolean;
  cardType: 'COMBO' | 'MONTHY';
  fee: number;
  isRenew: number;
  extendMonth: number;
  startExtendFrom?: string;
  canSelectStartExtend?: boolean;
}

export interface ResidentBusCardV2Type {
  locationCode: string;
  cards?: BusCardV2Type[];
}

export interface BusCardStats {
  isResident: boolean;
  residenceCards?: ResidentBusCardV2Type[];
  isSyncedBusCards: boolean;
  nonResidentCards?: BusCardV2Type[];
  syncedBusCards?: BusCardV2Type[];
}

export type AddBusCardType = ApiResType<BusCardType>;
export type FetchBusCardsType = ApiResType<BusCardStats>;

export interface BusCardFormDataType {
  firstName: string;
  lastName: string;
  cardArea: string;
  cardNumber: string;
  primary: boolean;
}
