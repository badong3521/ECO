import Config from 'react-native-config';
import Api from './api';
import {
  GetAllAreaRes,
  AreaType,
  HospitalType,
  VaccineType,
  GetAllHospitalRes,
  GetAllVaccineRes,
  GetVaccineInjectionReasonRes,
  VaccineInjectionReason,
  GetInjectionSymptomRes,
  InjectionSymptom,
} from './types/directEcoid';

export default class DirectEcoidApi extends Api {
  constructor() {
    super(Config.ECOID_URL);
  }

  async getAllAreas(): Promise<GetAllAreaRes> {
    const res = await this.request<AreaType>({
      path: '/ecoone/get_area_all',
      method: 'GET',
    });
    return res;
  }

  async validatePhoneInUsed(phoneNumber: string): Promise<GetAllAreaRes> {
    const res = await this.request<AreaType>({
      path: '/ecoone/validate/phone',
      method: 'GET',
      params: { phoneNumber },
    });
    return res;
  }

  async fetchVaccineInjectionReason(): Promise<GetVaccineInjectionReasonRes> {
    const res = await this.request<VaccineInjectionReason[]>({
      path: `/ecoone/injection/reasons`,
      method: 'GET',
    });
    return res;
  }

  async fetchVaccineHospital(): Promise<GetAllHospitalRes> {
    const res = await this.request<HospitalType[]>({
      path: `/ecoone/hospital`,
      method: 'GET',
    });
    return res;
  }

  async fetchVaccine(): Promise<GetAllVaccineRes> {
    const res = await this.request<VaccineType[]>({
      path: `/ecoone/vaccine`,
      method: 'GET',
    });
    return res;
  }

  async fetchInjectionSymptoms(): Promise<GetInjectionSymptomRes> {
    const res = await this.request<InjectionSymptom[]>({
      path: `/ecoone/injection/symptoms`,
      method: 'GET',
    });
    return res;
  }
}
