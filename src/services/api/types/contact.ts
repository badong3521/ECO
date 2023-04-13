import { ApiResType, Multilanguage } from './api';

export interface Contact {
  name: Multilanguage;
  phoneNumber: string;
  shortDescription: Multilanguage;
  longDescription: Multilanguage;
  logo: string;
  timeOpen: string;
  timeClose: string;
  daysOpen: string;
  email?: string;
}

export type ContactsReturnType = ApiResType<Contact[]>;
