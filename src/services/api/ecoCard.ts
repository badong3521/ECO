import Api from './api';
import { EcoCardsIdReturnType, EcoCardIdsType } from './types/ecoCard';

export default class EcoCardApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = '/eco_card_ids';
  }

  async getEcoCardIds(): Promise<EcoCardsIdReturnType> {
    const response = await this.request<EcoCardIdsType>({
      path: this.path,
      method: 'GET',
    });
    return response;
  }
}
