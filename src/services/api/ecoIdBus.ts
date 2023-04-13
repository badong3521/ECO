import Config from 'react-native-config';
import Api from './api';
import {
  ExtendBusCardPaymentRes,
  ExtendBusCardPaymentType,
} from './types/ecoIdBus';

interface ExtendCards {
  contractBusId: number;
  amount?: number;
  month?: string;
}
export interface ExtendChargeCardsParams {
  busPayments?: ExtendCards[];
}

export default class EcoIdBusApi extends Api {
  constructor() {
    super(Config.ECOID_URL);
  }

  async extendBusCards(
    params: ExtendChargeCardsParams,
  ): Promise<ExtendBusCardPaymentRes> {
    const res = await this.request<ExtendBusCardPaymentType>({
      path: `/ecoone/bus?return_url=ecoone://ecobus&action=RENEW&type=CARD`,
      method: 'POST',
      body: params,
    });
    return res;
  }

  async extendFreeBusCards(
    params: ExtendChargeCardsParams,
  ): Promise<ExtendBusCardPaymentRes> {
    const res = await this.request<ExtendBusCardPaymentType>({
      path: `/ecoone/renew_card_free?return_url=ecoone://ecobus&action=RENEW&type=CARD`,
      method: 'POST',
      body: params,
    });
    return res;
  }
}
