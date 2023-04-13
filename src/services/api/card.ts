import Api from './api';
import { CardType, CardTypes, CategoryType } from '../../components/Card/types';
import {
  FetchCardType,
  FetchCategoriesType,
  FetchRedeemType,
  RedeemResType,
  RedeemType,
} from './types/card';
import { randomizeCardOrientation } from '../../utils/card';
import { ApiResType, START_PAGE } from './types/api';

export interface FetchCardDataRes {
  cards?: CardType[];
  totalPages: number;
}

export interface FetchCardsParamsType {
  page: number;
  search?: string;
  category?: number;
  perPage?: number;
  isSpecial?: boolean;
  isOfficial?: boolean;
  isNewMerchant?: boolean;
  isPromotedMerchant?: boolean;
  subcategories?: string;
}

const FetchCardsEndpointTypes: {
  [key: string]: string;
} = {
  CardNews: 'card_news',
  CardEvent: 'card_events',
  CardPromotion: 'card_promotions',
  CardMerchant: 'card_merchants',
};

export default class CardApi extends Api {
  path: string;

  categoryPath: string;

  constructor() {
    super();
    this.path = 'cards';
    this.categoryPath = 'categories';
  }

  // Fetch a specific card
  async fetchCard(id: number, cardType: CardTypes): Promise<FetchCardType> {
    const uri = `${FetchCardsEndpointTypes[cardType]}/${id}`;
    const response = await this.request<CardType>({
      path: uri,
      method: 'GET',
    });
    if (response.status === 'success') {
      const { merchant } = response.result.data;
      if (merchant && merchant.cards) {
        merchant.cards = merchant.cards.map((card: CardType) =>
          randomizeCardOrientation(card),
        );
      }
    }
    return response;
  }

  // Fetch all card categories
  async fetchCategories(): Promise<FetchCategoriesType> {
    const response = await this.request<CategoryType[]>({
      path: this.categoryPath,
      method: 'GET',
    });
    if (response.status === 'success') {
      this.store.dispatch({
        type: 'homePage/setCategories',
        payload: response.result.data,
      });
    }
    return response;
  }

  async fetchCategory(id: number): Promise<ApiResType<CategoryType>> {
    const res = await this.request<CategoryType>({
      path: `${this.categoryPath}/${id}`,
      method: 'GET',
    });
    return res;
  }

  async redeemCard(cardId: number): Promise<RedeemResType> {
    const res = await this.request<RedeemType>({
      path: `card_promotions/${cardId}/redeem`,
      method: 'POST',
      eventId: 'redeem_coupon_card_finished',
      eventParams: {
        type: 'id',
        value: cardId.toString(),
      },
    });
    return res;
  }

  async fetchRedeemCard(cardId: number): Promise<FetchRedeemType> {
    const res = await this.request<RedeemType[]>({
      path: `card_promotions/${cardId}/redeem`,
      method: 'GET',
    });
    return res;
  }

  async fetchCardFeatured(params: FetchCardsParamsType) {
    const res = await this.request<CardType[]>({
      path: `card_featured`,
      method: 'GET',
      params,
    });
    this.store.dispatch({
      type: 'homePage/setFeatures',
      payload: res.status === 'success' ? res.result.data : undefined,
    });
    return res;
  }

  async fetchCardPromotionFeatured(params?: FetchCardsParamsType) {
    const res = await this.request<CardType[]>({
      path: `/card_promotion_featured`,
      method: 'GET',
      params,
    });
    return res;
  }

  async fetchCardNews(params: FetchCardsParamsType, home?: boolean) {
    const res = await this.request<CardType[]>({
      path: `card_news`,
      method: 'GET',
      params,
    });
    if (home) {
      this.store.dispatch({
        type: 'homePage/setNews',
        payload: res.status === 'success' ? res.result.data : undefined,
      });
    }
    return res;
  }

  async fetchCardMerchant(params: FetchCardsParamsType) {
    const res = await this.request<CardType[]>({
      path: `card_merchants`,
      method: 'GET',
      params,
    });
    return res;
  }

  async fetchCardPromotions(params: FetchCardsParamsType) {
    const res = await this.request<CardType[]>({
      path: `card_promotions`,
      method: 'GET',
      params,
    });
    return res;
  }

  async fetchFeaturedMerchantCards() {
    const res = await this.request<CardType[]>({
      path: `card_merchant_featured`,
      method: 'GET',
    });
    return res;
  }

  async fetchCardEvents(params: FetchCardsParamsType) {
    const res = await this.request<CardType[]>({
      path: `card_events`,
      method: 'GET',
      params,
    });
    if (params.page === START_PAGE && !params.isSpecial) {
      this.store.dispatch({
        type: 'homePage/setEvents',
        payload: res.status === 'success' ? res.result.data : undefined,
      });
    }
    if (params.isSpecial) {
      this.store.dispatch({
        type: 'homePage/setSpecialEvents',
        payload: res.status === 'success' ? res.result.data : undefined,
      });
    }
    return res;
  }
}
