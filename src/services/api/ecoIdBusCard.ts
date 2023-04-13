import Api from './api';
import { BusCardStats, FetchBusCardsType } from './types/busCardType';
import { ApiResType } from './types/api';

export interface SyncBusCardParams {
  contractBusIds: number[];
}

export default class EcoIdBusCardApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'ecoid/bus_cards';
  }

  async fetchBusCards(): Promise<FetchBusCardsType> {
    const res = await this.request<BusCardStats>({
      path: `${this.path}/stats`,
      method: 'GET',
    });
    this.store.dispatch({
      type: 'busCard/setBusCardStats',
      payload: res.status === 'success' ? res.result.data : undefined,
    });
    return res;
  }

  async syncBusCards(params: SyncBusCardParams): Promise<ApiResType<any>> {
    const res = await this.request<any>({
      path: `${this.path}/sync`,
      method: 'POST',
      params,
    });
    if (res.status === 'success') {
      this.fetchBusCards();
    }
    return res;
  }
}
