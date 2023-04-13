import Api from './api';
import { FetchRegionType, RegionType } from './types/ecoparkRegion';

export default class EcoparkRegionApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'ecopark_regions';
  }

  async fetchRegions(filter?: boolean): Promise<FetchRegionType> {
    const res = await this.request<RegionType[]>({
      path: filter ? `${this.path}?filter=true` : this.path,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setEcoparkAreas',
        payload: res.result.data,
      });
    }
    return res;
  }
}
