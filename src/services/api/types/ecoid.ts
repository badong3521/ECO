import { ApiResType } from './api';

export type SyncEcoIdParams = {
  ecoid: number;
  residences: ResidentType[];
};

export type BillTypes = 'XE' | 'DIEN' | 'NUOC' | 'OTHER' | 'VAT';
export type PaymentMethodTypes = 'Cash' | 'Bank transfer' | 'Card' | 'Ecoone';
export type SortTypes = 'ASC' | 'DESC';
export type RegistrationStatusCodeTypes =
  | 'UNSUBMITTED'
  | 'SUBMITTED'
  | 'UNVERIFIED'
  | 'VERIFIED'
  | 'EDITING'
  | 'EDITED';

export type ResidentType = {
  residentId: number;
  ecoid?: number;
  fullName: string;
  areaName?: string;
  zoneName: string;
  locationCode?: string;
  floorName: string;
  isOwner: number;
  isRenter: boolean;
  isAdminAccess: boolean;
  address: string;
  totalUnpaidBill: number;
  registrationStatusCode: RegistrationStatusCodeTypes;
  relationshipName?: string;
  reasonIncorrect?: string;
  createdDate?: string;
  updatedDate?: string;
};

export type ResidentFormDataType = ResidentType & {
  isRegisterOthers?: boolean;
  phoneNumber?: string;
  birthday?: string;
  businessMinor?: string;
  countryId?: number;
  gender?: number;
  identityIssueDate?: string;
  identityIssuePlace?: string;
  identityScanBack?: string;
  identityScanFront?: string;
  identityNumber?: string;
  ownerName?: string;
  passportExpiryDate?: string;
  passportNumber?: string;
  passportSignDate?: string;
  passportScan?: string;
  birthCertificateScan?: string;
  permanentAddress?: string;
  relationshipId?: number;
  stayStatusCode?: number;
  tempLeaveFromDate?: string;
  nationId?: number;
  insuranceNumber?: string;
  career?: string;
  workPlace?: string;
  village?: string;
  provinceId?: number;
  districtId?: number;
  communeId?: number;
  verificationType?: VerificationType;
  otherScan?: string[];
  countries?: ResidentCountryType[];
  relationships?: ResidentRelationshipType[];
  stayStatus?: ResidentStayStatusType[];
  careers?: string[];
  nations?: ResidentNationType[];
};

export type VerificationType = 'IDENTITY' | 'PASSPORT' | 'BIRTH_CERTIFICATE';

export type ResidentNationType = {
  nationId: number;
  name: string;
};

export type ResidentCountryType = {
  countryId: number;
  name: string;
};

export type ResidentRelationshipType = {
  relationshipId: number;
  relationshipName: string;
  relationshipNameEn: string;
};

export type ResidentStayStatusType = {
  stayStatusCode: string;
  name: string;
  nameEn: string;
};

export type ResidenceType = {
  residentId: number;
  fullName: string;
  areaName: string;
  zoneName: string;
  locationCode: string;
  floorName: string;
  isOwner: boolean;
  isRenter: boolean;
  isAdminAccess: boolean;
  members: ResidentType[];
  banner: string;
};

export type BillType = {
  billOfMonth: string;
  billId: number;
  description: string;
  issueDate: string;
  finalPaymentDate: string;
  amount: number;
  allocatedAmount: number;
  debtAmount: number;
  quantity: number;
  expiryDate: string;
  billType: BillTypes;
  vat: number;
  details: UtilityBillDetailType[];
};

export type TransactionType = {
  transactionId: string;
  reference: string;
  amount: number;
  transactionDate: Date;
  billOfMonth: string;
  paymentMethod: PaymentMethodTypes;
  billType: BillTypes;
  description: string;
  createdDate: string;
  bill?: BillType;
  details?: UtilityBillDetailType[];
};

export type UtilityBillDetailType = {
  description: string;
  amount?: number;
  quantity?: number;
  unit?: string;
  content?: string;
  vehicleRegistrationNumber?: string;
  vehicleType?: string;
  cardCode?: string;
  cardNumber?: string;
};

export interface SelectedBillType {
  [id: string]: BillType | undefined;
}

export type PaymentBillResType = {
  uri: string;
};

export type ResidentSurveyStatsType = {
  residentId: number;
  total: number;
};

export type VaccineSurveyStatsType = {
  surveyInjection: ResidentSurveyStatsType[];
  surveyHealth: ResidentSurveyStatsType[];
};

export type FetchEcoIdResidentsType = ApiResType<ResidentType[]>;
export type FetchResidentFormDataType = ApiResType<ResidentFormDataType>;
export type FetchVaccineSurveyStatsType = ApiResType<VaccineSurveyStatsType>;
