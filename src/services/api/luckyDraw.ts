import Api from './api';
import { ApiResType } from './types/api';
import { CardType } from '../../components/Card/types';

export default class LuckyDrawApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = `/lucky_draws/`;
  }

  async fetchLiXis(page?: number): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/card_promotions`,
      params: {
        page,
      },
      method: 'GET',
    });
    return res;
  }

  async fetchLiXi(id: number): Promise<ApiResType<CardType>> {
    const res = await this.request<CardType>({
      path: `${this.path}/card_promotions/${id}`,
      method: 'GET',
    });
    return res;
  }
}
