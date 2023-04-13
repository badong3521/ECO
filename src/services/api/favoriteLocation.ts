import Api from './api';
import {
  FetchFavoriteLocationType,
  FavoriteLocationParamType,
  AddFavoriteLocationType,
  FavoriteLocationType,
} from './types/favoriteLocation';
import { ApiResType } from './types/api';

export default class FavoriteLocationApi extends Api {
  path: string;

  constructor() {
    super();
    const state = this.store.getState();
    const { user } = state;
    this.path = `users/${user?.user?.id}/favorites/locations`;
  }

  async fetchFavoriteBusLocations(): Promise<FetchFavoriteLocationType> {
    const res = await this.request<FavoriteLocationType[]>({
      path: `${this.path}?origin=ecobus`,
      method: 'GET',
    });
    let favoriteLocations;
    if (res.status === 'success') {
      favoriteLocations = res.result.data;
    }
    this.store.dispatch({
      type: 'user/setFavoriteBusLocations',
      payload: favoriteLocations,
    });
    return res;
  }

  async addFavoriteLocation(
    params: FavoriteLocationParamType,
  ): Promise<AddFavoriteLocationType> {
    const res = await this.request<FavoriteLocationType>({
      path: this.path,
      body: params,
      method: 'POST',
      eventId: 'bus_add_favorite_location',
      eventParams: {
        type: params.name,
        value: params.address,
      },
    });
    return res;
  }

  async deleteFavoriteLocation(id: number): Promise<ApiResType<any>> {
    const res = await this.request({
      path: `${this.path}/${id}`,
      method: 'DELETE',
      eventId: 'bus_delete_favorite_location',
    });
    return res;
  }
}
