import Api from './api';
import {
  AddBusCardType,
  BusCardType,
  BusCardFormDataType,
  FetchBusCardsType,
} from './types/busCardType';
import { ApiResType } from './types/api';

export default class BusCardApi extends Api {
  path: string;

  constructor() {
    super();
    const state = this.store.getState();
    const { user } = state;
    this.path = `users/${user?.user?.id}/bus_cards`;
  }

  // Associates a new bus card for user when they are new or they deleted their previous card
  async addBusCard(params: BusCardFormDataType): Promise<AddBusCardType> {
    const res = await this.request<BusCardType>({
      path: this.path,
      method: 'POST',
      body: params,
      eventId: 'bus_add_card_finished',
      eventParams: {
        type: 'area',
        value: params.cardArea,
      },
    });
    if (res.status === 'success') {
      const busCardData = res.result.data;
      const state = this.store.getState();
      const { user } = state;
      // updating the card list on frontend so that the page does not have to reload
      const filteredBusCards =
        params.primary && user.busCards
          ? user.busCards.map((card: BusCardType) =>
              card.primary ? { ...card, primary: false } : card,
            )
          : user.busCards;
      const newBusCards = filteredBusCards
        ? [...filteredBusCards, { ...busCardData }]
        : [busCardData];
      this.store.dispatch({
        type: 'user/setBusCards',
        payload: newBusCards,
      });
    }
    return res;
  }

  // Checks if there is any card associated with the user
  async fetchBusCards(): Promise<FetchBusCardsType> {
    const res = await this.request<BusCardType[]>({
      path: this.path,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setBusCards',
        payload: res.result.data,
      });
    } else {
      this.store.dispatch({
        type: 'user/setBusCards',
        payload: undefined,
      });
    }
    return res;
  }

  // Removes the card that is associated with the current user
  async removeUserBusCard(busCardId: number): Promise<ApiResType<any>> {
    const state = this.store.getState();
    const { user } = state;

    const res = await this.request<any>({
      path: `${this.path}/${busCardId}`,
      method: 'DELETE',
      eventId: 'bus_remove_card_finished',
    });
    if (res.status === 'success') {
      const filterBusCards = user.busCards.filter(
        (card: BusCardType) => card.id !== busCardId,
      );
      const newBusCards =
        filterBusCards.length > 0 ? filterBusCards : undefined;
      this.store.dispatch({
        type: 'user/setBusCards',
        payload: newBusCards,
      });
    }
    return res;
  }

  // Removes the card that is associated with the current user
  async updateBusCard(params: any): Promise<any> {
    try {
      const { id } = params;
      const snakeCasedParams = this.camelToSnake({
        firstName: params.firstName,
        lastName: params.lastName,
        primary: params.primary,
      });
      const res = await this.http.patch(`${this.path}/${id}`, snakeCasedParams);
      const parsedData = this.snakeToCamel(res.data);
      const busCardData = parsedData.data;
      const state = this.store.getState();
      const { user } = state;
      // updating the card list on frontend so that the page does not have to reload
      const newBusCard = user.busCards.map((card: BusCardType) => {
        if (card.id === id) {
          return busCardData;
        }
        if (params.primary && card.primary) {
          return { ...card, primary: false };
        }
        return card;
      });
      this.store.dispatch({
        type: 'user/setBusCards',
        payload: newBusCard,
      });
      return {
        status: 'success',
        result: busCardData,
      };
    } catch (err) {
      const errors = this.handleError(err.response.data);
      return {
        status: 'failed',
        errors,
      };
    }
  }
}
