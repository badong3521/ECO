import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { Alert } from 'react-native';
import { store } from '../../store';
import i18n from '../../i18n';
import CamelCaseConverter from '../camelCaseConverter';
import { ApiReqType, ApiResType } from './types/api';
import setupAxiosInterceptors from './axiosInterceptors';
import Firebase from '../firebase';

// Inherit all API subclasses from this in order to automatically
// get access to Axios and store. It will also automatically
// append user's JWT token to all requests if it's present in the store.
export default class Api {
  http: AxiosInstance;

  store: any;

  constructor(url?: string) {
    // TODO: Implement version
    this.http = Axios.create({
      baseURL: `${url || Config.API_BASE_URL}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setupAxiosInterceptors(store, this.http);

    this.store = store;
  }

  // Convert snake_case to camelCase
  snakeToCamel = (object: any): any => {
    return CamelCaseConverter.convertKeys('camel', object);
  };

  // Convert camelCase to snake_case
  camelToSnake = (object: any): any => {
    return CamelCaseConverter.convertKeys('snake', object);
  };

  // Return i18n strings from API error
  handleError = (errResponse: any) => {
    if (errResponse.error) {
      const message: string = i18n.t(`errors.${errResponse.error}`);
      if (message) Alert.alert('Thông báo', message);
      return {
        error: errResponse.error,
        message,
      };
    }
    if (errResponse.errors) {
      return errResponse
        ? errResponse?.errors?.map((x: any) => i18n.t(`errors.${x.code}`))
        : 'errors.unknown';
    }
    if (errResponse.message) {
      return errResponse.message;
    }
    return 'errors.unknown';
  };

  async request<D>(req: ApiReqType): Promise<ApiResType<D>> {
    try {
      let snakeCasedParams;
      let snakeCasedBody = req.body;
      // for POST and PATCH request, will use `body` instead of `params`
      if (req.params) {
        if (req.method === 'PATCH' || req.method === 'POST') {
          snakeCasedBody = JSON.stringify(this.camelToSnake(req.params));
        } else {
          snakeCasedParams = this.camelToSnake(req.params);
        }
      } else if (req.body && !(req.body instanceof FormData)) {
        snakeCasedBody = JSON.stringify(this.camelToSnake(req.body));
      }
      const config = <AxiosRequestConfig>{
        method: req.method,
        url: req.path,
        params: snakeCasedParams,
        data: snakeCasedBody,
        headers: req.headers,
      };
      const res = await this.http.request(config);
      if (req.eventId) {
        Firebase.track(req.eventId, req.eventParams);
      }
      return this.parseData<D>(res);
    } catch (err) {
      const errors = this.handleError(err?.response?.data);
      return {
        status: 'failed',
        errors,
        statusCode: err?.response?.status,
      };
    }
  }

  parseData<D>(res: AxiosResponse): ApiResType<D> {
    const parsedData = this.snakeToCamel(res.data);
    return {
      status: 'success',
      result: parsedData,
    };
  }
}
