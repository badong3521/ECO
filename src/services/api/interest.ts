import Api from './api';
import { FetchInterestType, InterestCategory } from './types/interest';

export default class InterestApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = `interests`;
  }

  // Associates a new bus card for user when they are new or they deleted their previous card
  async fetchAllInterests(): Promise<FetchInterestType> {
    const res = await this.request<InterestCategory[]>({
      path: this.path,
      method: 'GET',
    });
    return res;
  }
}
