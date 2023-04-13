import Api from './api';
import { Fact, FetchFactsType } from './types/fact';

export default class FactApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'facts';
  }

  async facts(): Promise<FetchFactsType> {
    const res = await this.request<Fact>({
      path: this.path,
      method: 'GET',
    });
    return res;
  }
}
