import Api from './api';
import {
  BillType,
  BillTypes,
  FetchEcoIdResidentsType,
  ResidenceType,
  PaymentBillResType,
  ResidentType,
  SortTypes,
  SyncEcoIdParams,
  TransactionType,
  FetchResidentFormDataType,
  ResidentFormDataType,
  VaccineSurveyStatsType,
} from './types/ecoid';
import { ApiResType } from './types/api';
import { UserType } from '../../features/User/types';
import ReminderApi from './reminder';

export interface PaymentHistoryParams {
  residentId: number;
  page: number;
  orderBy: SortTypes;
  filterBy: BillTypes[];
}

const reminderApi = new ReminderApi();
export default class EcoIdApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = `ecoid`;
  }

  // get ALL residences associated with user's phone number
  async fetchEcoIdResidents(): Promise<FetchEcoIdResidentsType> {
    const res = await this.request<ResidentType[]>({
      path: `${this.path}/residences`,
      method: 'GET',
    });
    return res;
  }

  async syncEcoId(params: SyncEcoIdParams): Promise<ApiResType<UserType>> {
    const res = await this.request<UserType>({
      path: `${this.path}/sync`,
      method: 'POST',
      params,
    });
    if (res.status === 'success') {
      reminderApi.fetchReminders();
    }
    return res;
  }

  // get residences CHOSEN by user in syncing process
  async fetchResidences(): Promise<FetchEcoIdResidentsType> {
    const res = await this.request<ResidentType[]>({
      path: `${this.path}/households`,
      method: 'GET',
    });
    return res;
  }

  async fetchResidenceInfo(id: number): Promise<ApiResType<ResidenceType>> {
    const res = await this.request<ResidenceType>({
      path: `${this.path}/households/${id}`,
      method: 'GET',
    });
    return res;
  }

  async fetchHouseholdBills(id: number): Promise<ApiResType<BillType[]>> {
    const res = await this.request<BillType[]>({
      path: `${this.path}/households/${id}/bills`,
      method: 'GET',
    });
    return res;
  }

  async fetchPaidBills(
    params: PaymentHistoryParams,
  ): Promise<ApiResType<BillType[]>> {
    const res = await this.request<BillType[]>({
      path: `${this.path}/households/${params.residentId}/paid_bills`,
      method: 'GET',
      params: {
        ...params,
        filterBy:
          params.filterBy && params.filterBy.length > 0
            ? params.filterBy.join(',')
            : undefined,
      },
    });
    return res;
  }

  async fetchPaidBillDetails(
    residentId: number,
    billId: number,
  ): Promise<ApiResType<TransactionType>> {
    const res = await this.request<TransactionType>({
      path: `${this.path}/households/${residentId}/paid_bills/${billId}`,
      method: 'GET',
    });
    return res;
  }

  async payments(
    householdId: number,
    billIds: string[],
  ): Promise<ApiResType<PaymentBillResType>> {
    const res = await this.request<PaymentBillResType>({
      path: `${
        this.path
      }/households/${householdId}/payments?bill_ids=${billIds.join(',')}`,
      method: 'GET',
    });
    return res;
  }

  async fetchVaccineRegistrationStatus(): Promise<ApiResType<any>> {
    const res = await this.request<any>({
      path: `${this.path}/vaccine/stats`,
      method: 'GET',
    });
    return res;
  }

  async fetchVaccineSurveyStats(): Promise<ApiResType<VaccineSurveyStatsType>> {
    const res = await this.request<VaccineSurveyStatsType>({
      path: `${this.path}/vaccine_survey/stats`,
      method: 'GET',
    });
    return res;
  }

  async fetchResidencesWithUpdateStatus(): Promise<FetchEcoIdResidentsType> {
    const res = await this.request<ResidentType[]>({
      path: `${this.path}/vaccine/registrations`,
      method: 'GET',
    });
    return res;
  }

  async fetchResidentDataForm(
    residentId: number,
  ): Promise<FetchResidentFormDataType> {
    const res = await this.request<ResidentFormDataType>({
      path: `${this.path}/vaccine/residents/${residentId}`,
      method: 'GET',
    });
    return res;
  }

  async submitUserVaccineData(params: any) {
    const res = await this.request<any>({
      path: `${this.path}/vaccine/registrations`,
      method: 'POST',
      body: {
        ...params,
        birthday: this.dateToString(params.birthday),
        identityIssueDate: this.dateToString(params.identityIssueDate),
        passportSignDate: this.dateToString(params.passportSignDate),
        passportExpiryDate: this.dateToString(params.passportExpiryDate),
        tempLeaveFromDate: this.dateToString(params.tempLeaveFromDate),
        identityNumber: this.textWithoutSpace(params.identityNumber),
        passportNumber: this.textWithoutSpace(params.passportNumber),
        identityScanFront: params.identityScanFront?.sgid,
        identityScanBack: params.identityScanBack?.sgid,
        passportScan: params.passportScan?.sgid,
        birthCertificateScan: params.birthCertificateScan?.sgid,
        otherScan: params.otherScan?.map((image: any) => image.sgid),
      },
    });
    return res;
  }

  async submitAfterVaccineInjectionSurvey(params: any) {
    const res = await this.request<any>({
      path: `${this.path}/vaccine_survey/after_injections`,
      method: 'POST',
      body: {
        ...params,
        injectionStatus:
          params.injectionStatus && parseInt(params.injectionStatus, 10),
        reasonId: params.reasonId && parseInt(params.reasonId, 10),
        injectionDate: this.dateToString(params.injectionDate),
        injectionTime:
          params.injectionTime && parseInt(params.injectionTime, 10),
        image1: params.image1?.sgid,
        image2: params.image2?.sgid,
      },
    });
    return res;
  }

  async submitHealthFeedbackSurvey(params: any) {
    const res = await this.request<any>({
      path: `${this.path}/vaccine_survey/health_feedbacks`,
      method: 'POST',
      body: {
        ...params,
        symptomStatus:
          params.symptomStatus && parseInt(params.symptomStatus, 10),
        injectionDate: this.dateToString(params.injectionDate),
        injectionTime:
          params.injectionTime && parseInt(params.injectionTime, 10),
        symptoms: params.symptoms && params.symptoms.join(','),
      },
    });
    return res;
  }

  dateToString = (date?: Date) => {
    if (!date) return undefined;
    return date.toISOString();
  };

  textWithoutSpace = (text?: string) => {
    return text?.replace(/ /g, '');
  };
}
