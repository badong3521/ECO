import Api from './api';
import { FavoriteCard, FetchFavoritesType } from './types/favorite';
import { ApiResType } from './types/api';
import { randomizeCardOrientation } from '../../utils/card';

export default class FavoritesApi extends Api {
  path: string;

  constructor() {
    super();
    const state = this.store.getState();
    const { user } = state;
    this.path = `/users/${user?.user?.id}/favorites/cards`;
  }

  async cardFavorites(page: number): Promise<FetchFavoritesType> {
    const res = await this.request<FavoriteCard[]>({
      path: this.path,
      params: {
        page,
      },
      method: 'GET',
    });
    if (res.status === 'success') {
      res.result.data.forEach((datum: FavoriteCard) => {
        datum.card = randomizeCardOrientation(datum.card);
      });
    }
    return res;
  }

  async favoriteCard(cardId: number): Promise<ApiResType<any>> {
    const res = await this.request<FavoriteCard[]>({
      path: this.path,
      params: {
        cardId,
      },
      eventId: 'favorite_card',
      eventParams: {
        type: 'id',
        value: cardId.toString(),
      },
      method: 'POST',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'directory/addAFavorite',
      });
    }
    return res;
  }

  async unFavoriteCard(cardId: number): Promise<ApiResType<any>> {
    const res = await this.request<FavoriteCard[]>({
      path: `${this.path}/${cardId}`,
      method: 'DELETE',
      eventId: 'un_favorite_card',
      eventParams: {
        type: 'id',
        value: cardId.toString(),
      },
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'directory/removeAFavorite',
      });
    }
    return res;
  }
}
