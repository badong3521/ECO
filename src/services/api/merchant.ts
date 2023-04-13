import Api from './api';
import { CardType } from '../../components/Card/types';
import { ApiResType } from './types/api';

export default class MerchantApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = `merchants`;
  }

  async fetchEventCards(
    id: number,
    page?: number,
  ): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/${id}/card_events`,
      method: 'GET',
      params: {
        page,
      },
    });
    return res;
  }

  async fetchNewsCards(
    id: number,
    page?: number,
  ): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/${id}/card_news`,
      method: 'GET',
      params: {
        page,
      },
    });
    return res;
  }

  async fetchPromotionCards(
    id: number,
    page?: number,
  ): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/${id}/card_promotions`,
      method: 'GET',
      params: {
        page,
      },
    });
    return res;
  }
}
