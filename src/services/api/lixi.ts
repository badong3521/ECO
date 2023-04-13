import { LayoutAnimation, Platform } from 'react-native';
import Api from './api';
import { FetchLixiRes, FetchLixiStatusRes, LixiStatusType } from './types/lixi';
import { CardType } from '../../components/Card/types';

export default class LixiApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'lucky_draws';
  }

  async fetchLixiStatus(): Promise<FetchLixiStatusRes> {
    const res = await this.request<LixiStatusType>({
      path: `${this.path}/card_promotions/status`,
      method: 'GET',
    });
    if (Platform.OS === 'ios' && res.status === 'success') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    this.store.dispatch({
      type: 'homePage/setLixiStatus',
      payload: res.status === 'success' ? res.result.data : undefined,
    });
    return res;
  }

  async getLixi(): Promise<FetchLixiRes> {
    const res = await this.request<CardType>({
      path: `${this.path}/draw`,
      method: 'POST',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'homePage/setLixiStatus',
        payload: undefined,
      });
    }
    return res;
  }
}
