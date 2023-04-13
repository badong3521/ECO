import Api from './api';
import {
  BusRouteScheduleResType,
  BusRouteScheduleType,
  FetchBusRouteType,
} from './types/route';
import { BusRouteType } from './types/bus';

interface GetRouteSchedulesParams {
  routeId: number;
  stopId?: number;
  date?: Date;
}

export default class BusRouteApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'buses/routes';
  }

  async fetchAllBusRoutes(): Promise<FetchBusRouteType> {
    const res = await this.request<BusRouteType[]>({
      path: this.path,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'bus/setBusRoutes',
        payload: res.result.data,
      });
    }
    return res;
  }

  async getRouteSchedules(
    params: GetRouteSchedulesParams,
  ): Promise<BusRouteScheduleResType> {
    const { routeId, stopId, date } = params;
    let pathUrl = `${this.path}/${routeId}/schedules?`;
    if (stopId) {
      pathUrl = pathUrl.concat(`stop_id=${stopId}`);
    }
    if (date) {
      pathUrl = pathUrl.concat(
        `&date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      );
    }
    const res = await this.request<BusRouteScheduleType>({
      path: pathUrl,
      method: 'GET',
    });
    return res;
  }
}
