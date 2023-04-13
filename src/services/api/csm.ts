import {
  DetailHandoverAppartmentType,
  HandoverAppartmentType,
  TimeSlotsType,
} from 'features/Csm/types';
import Config from 'react-native-config';
import Api from './api';
import { ApiResType } from './types/api';

export default class CSMApi extends Api {
  path?: string;

  constructor() {
    super(Config.CSM_URL);
  }

  async fetchListHandoverAppartment(): Promise<
    ApiResType<HandoverAppartmentType[]>
  > {
    const response = await this.request<HandoverAppartmentType[]>({
      path: 'handover-campaigns',
      method: 'GET',
    });
    return response;
  }

  async fetchListTimeSlots(): Promise<ApiResType<TimeSlotsType[]>> {
    const response = await this.request<TimeSlotsType[]>({
      path: 'time-slots/all',
      method: 'GET',
    });
    return response;
  }

  async fetchDetailHandover(
    id: string,
  ): Promise<ApiResType<DetailHandoverAppartmentType>> {
    const response = await this.request<DetailHandoverAppartmentType>({
      path: `handover-campaigns/${id}`,
      method: 'GET',
    });
    return response;
  }

  async orderHandover(id: string, timeSlotId: number): Promise<any> {
    const response = await this.request<any>({
      path: `handover-campaigns/${id}/schedule`,
      method: 'PUT',
      body: {
        timeSlotId,
      },
    });
    return response;
  }

  async cancelHandover(id: string): Promise<any> {
    const response = await this.request<any>({
      path: `handover-campaigns/${id}/cancel`,
      method: 'PUT',
    });
    return response;
  }

  async fetchLinkSurvey(id: string): Promise<ApiResType<any>> {
    const response = await this.request<any>({
      path: `handover-campaigns/${id}/survey`,
      method: 'GET',
    });
    return response;
  }

  async sendEmailAfterSurvey(
    handoverCampaignLocationId: string,
  ): Promise<ApiResType<any>> {
    const response = await this.request<any>({
      path: 'handover-campaigns/thanks',
      method: 'POST',
      body: {
        handoverCampaignLocationId,
      },
    });
    return response;
  }
}
