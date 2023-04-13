import { ApiResType } from './api';

export interface AreaType {
  province: ProvinceType[];
  district: DistrictType[];
  commune: CommuneType[];
}

export interface ProvinceType {
  provinceId: number;
  name: string;
}

export interface DistrictType {
  districtId: number;
  provinceId: number;
  name: string;
}

export interface CommuneType {
  communeId: number;
  districtId: number;
  name: string;
}

export interface HospitalType {
  hospitalId: number;
  name: string;
}

export interface VaccineType {
  vaccineId: number;
  name: string;
}

export interface VaccineInjectionReason {
  reasonId: number;
  titleEn: string;
  titleVi: string;
}

export interface InjectionSymptom {
  symptomId: number;
  titleVi: string;
  titleEn: string;
}

export type GetAllAreaRes = ApiResType<AreaType>;
export type GetAllHospitalRes = ApiResType<HospitalType[]>;
export type GetAllVaccineRes = ApiResType<VaccineType[]>;
export type GetVaccineInjectionReasonRes = ApiResType<VaccineInjectionReason[]>;
export type GetInjectionSymptomRes = ApiResType<InjectionSymptom[]>;
