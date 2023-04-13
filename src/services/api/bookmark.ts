import Api from './api';
import { ApiResType } from './types/api';
import { CardType } from '../../components/Card/types';
import { BookmarkOverviewType } from './types/bookmark';

export default class BookmarkApi extends Api {
  path: string;

  constructor() {
    super();
    const state = this.store.getState();
    const { user } = state;
    this.path = `/users/${user.user?.id}/bookmark`;
  }

  async fetchMerchantCards(page?: number): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/card_merchants`,
      params: {
        page,
      },
      method: 'GET',
    });
    return res;
  }

  async fetchEventCards(page?: number): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/card_events`,
      params: {
        page,
      },
      method: 'GET',
    });
    return res;
  }

  async fetchPromotionCards(page?: number): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/card_promotions`,
      params: {
        page,
      },
      method: 'GET',
    });
    return res;
  }

  async fetchNewsCards(page?: number): Promise<ApiResType<CardType[]>> {
    const res = await this.request<CardType[]>({
      path: `${this.path}/card_news`,
      params: {
        page,
      },
      method: 'GET',
    });
    return res;
  }

  async bookmarkCard(cardId: number): Promise<ApiResType<CardType>> {
    const res = await this.request<CardType>({
      path: `${this.path}/cards`,
      params: {
        cardId,
      },
      method: 'POST',
    });
    return res;
  }

  async unbookmarkCard(cardId: number): Promise<ApiResType<any>> {
    const res = await this.request<any>({
      path: `${this.path}/cards/${cardId}`,
      method: 'DELETE',
    });
    return res;
  }

  async fetchOverview(): Promise<ApiResType<BookmarkOverviewType>> {
    const res = await this.request<BookmarkOverviewType>({
      path: `${this.path}/cards/overview`,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setBookmarkOverview',
        payload: res.result.data,
      });
    }
    return res;
  }
}
