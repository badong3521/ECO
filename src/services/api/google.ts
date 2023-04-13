import { LatLng } from 'react-native-maps';
import Api from './api';
import { AddressInfoType, SearchAddressType } from './types/bus';

export default class GoogleLocationApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'google';
  }

  // search a address by name to get location and stops around if nearbyStops=true
  async searchAddressByName(
    address: string,
    nearbyStops: boolean,
  ): Promise<SearchAddressType> {
    const res = await this.request<AddressInfoType>({
      path: `${this.path}/locations`,
      params: {
        info: address,
        nearbyStops,
      },
      method: 'GET',
    });
    return res;
  }

  // search a address by coordinate to get location detail and stops around if nearbyStops=true
  async searchAddressByCoordinate(
    coordinate: LatLng,
    nearbyStops: boolean,
  ): Promise<SearchAddressType> {
    const res = await this.request<AddressInfoType>({
      path: `${this.path}/locations`,
      params: {
        info: [coordinate.latitude, coordinate.longitude],
        nearbyStops,
      },
      method: 'GET',
    });
    return res;
  }
}
