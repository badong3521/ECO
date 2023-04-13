import { ApiResType } from './api';

type ReminderTypes =
  | 'weather'
  | 'new_bill'
  | 'ecoid_onboarding'
  | 'electricBill';

export interface ReminderType {
  type: ReminderTypes;
}

export interface ReminderWeatherType extends ReminderType {
  temp: number;
  windSpeed: number;
  humidity: number;
  weatherIcon: number;
}

export interface ReminderNewBillType extends ReminderType {
  totalBill: number;
  residentIds: number[];
}

export interface ReminderElectricBillType extends ReminderType {
  totalBill: number;
}

export type FetchRemindersType = ApiResType<ReminderType[]>;
