import Api from './api';
import Polyline from '../polyline';
import {
  SearchDirectionsSuccessType,
  SearchDirectionsType,
} from './types/direction';

interface SearchRouteToDirectionType {
  departure: number[];
  destination: number[];
  departureTime?: string;
}

export default class DirectionApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'directions';
  }

  // search the bus routes schedules from a departure to a destination
  async searchDirection(
    params: SearchRouteToDirectionType,
  ): Promise<SearchDirectionsSuccessType> {
    const { departure, destination, departureTime } = params;
    const requestTime = new Date();
    if (departureTime) {
      const splitTime = departureTime.split(':');
      requestTime.setUTCHours(Number(splitTime[0]));
      requestTime.setUTCMinutes(Number(splitTime[1]));
    } else {
      requestTime.setUTCHours(requestTime.getHours());
      requestTime.setUTCMinutes(requestTime.getMinutes());
    }
    const res = await this.request<SearchDirectionsType>({
      path: this.path,
      method: 'GET',
      params: {
        departure: `${departure[0]},${departure[1]}`,
        destination: `${destination[0]},${destination[1]}`,
        departureTime: Math.round(requestTime.getTime() / 1000),
      },
    });
    if (res.status === 'success') {
      // Decode all encoded polylines
      res.result.data.schedules.forEach((schedule: any) => {
        const polylines = Polyline.decode(
          schedule.path.route.metadata.polyline,
        );
        schedule.decodedPolyline = polylines;
      });
    }
    return res;
  }
}
