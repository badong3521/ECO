import Api from './api';
import { Tooltip } from './types/tooltip';
import { ApiResType } from './types/api';

export default class TooltipApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = '/users/tooltips';
  }

  async fetchTooltips(): Promise<ApiResType<Tooltip>> {
    const res = await this.request<Tooltip>({
      path: this.path,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setTooltip',
        payload: res.result.data,
      });
    } else {
      this.store.dispatch({
        type: 'user/setTooltip',
        payload: undefined,
      });
    }
    return res;
  }
}
