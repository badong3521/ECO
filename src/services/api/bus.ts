import Api from './api';
import Polyline from '../polyline';
import {
  BusLocationType,
  BusRouteDetailReturnType,
  BusRouteType,
  BusSchedulesType,
  BusCardPriceType,
  FetchBusLocationType,
  FetchBusSchedulesType,
  FetchBusCardPriceType,
} from './types/bus';

export default class BusApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'buses';
  }

  async getBusRouteDetail(routeId: number): Promise<BusRouteDetailReturnType> {
    const response = await this.request<BusRouteType>({
      path: `${this.path}/routes/${routeId}`,
      method: 'GET',
    });

    if (response.status === 'success') {
      const bus = response.result.data;
      const polylines = Polyline.decode(bus.metadata!.polyline);
      response.result.data.decodedPolyline = polylines;
      this.store.dispatch({
        type: 'bus/setActiveBus',
        payload: response.result.data,
      });
    }
    return response;
  }

  async fetchBusLocations(
    routeId: number | null,
  ): Promise<FetchBusLocationType> {
    let url = `${this.path}/locations`;
    if (routeId) {
      url += `?route_id=${routeId}`;
    }
    const res = await this.request<BusLocationType[]>({
      path: url,
      method: 'GET',
    });
    return res;
  }

  async fetchBusCardPrices(): Promise<FetchBusCardPriceType> {
    const res = await this.request<BusCardPriceType[]>({
      path: `${this.path}/prices`,
      method: 'GET',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'bus/setBusCardPrices',
        payload: res.result.data,
      });
    }
    return res;
  }

  async fetchBusSchedules(routeId?: number): Promise<FetchBusSchedulesType> {
    let url = `${this.path}/schedules`;
    if (routeId) {
      url += `/${routeId}`;
    }
    const res = await this.request<BusSchedulesType>({
      path: url,
      method: 'GET',
    });
    return res;
  }
}
