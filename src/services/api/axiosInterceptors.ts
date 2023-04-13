import Axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import CamelCaseConverter from '../camelCaseConverter';
import NavigationService from '../navigationService';
import { OauthToken } from '../../features/User/reducers';

let isFetching = false;
// Array of axios instances that are waiting for a token to be refreshed
let subscribers: Array<(token: OauthToken) => void> = [];

function setupAxiosInterceptors(store: any, axios: AxiosInstance) {
  setupAuthorizationInterceptor(store, axios);
  setupRefreshTokenInterceptor(store, axios);
}

// Set user token in all requests automatically
function setupAuthorizationInterceptor(store: any, http: AxiosInstance) {
  http.interceptors.request.use(async (config: any) => {
    const nConfig = config;
    const state: any = store.getState();
    const { userToken } = state.user;
    if (userToken) {
      const authHeader = getAuthHeader(userToken);
      nConfig.headers.authorization = authHeader;
    }
    return nConfig;
  });
}

function onRefreshed(token: OauthToken) {
  subscribers.map(cb => cb(token));
  subscribers = [];
}

function subscribeTokenRefresh(cb: (token: OauthToken) => void) {
  subscribers.push(cb);
}

async function fetchNewToken(store: any) {
  isFetching = true;
  const token = await refreshAccessToken(store);
  onRefreshed(token);
  isFetching = false;
}

// Handle oauth refresh tokens.
// If a request fails with a 401 we try to refresh the user's token.
// If it still fails we fail like usual.
function setupRefreshTokenInterceptor(store: any, http: AxiosInstance) {
  http.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any): Promise<any> => {
      const originalRequest = error.config;
      const { status } = error.response;
      if (status === 401) {
        if (!isFetching) {
          fetchNewToken(store);
        }

        // Subscribe so that we can send the request when the token is refreshed
        return new Promise(resolve => {
          subscribeTokenRefresh((token: OauthToken) => {
            originalRequest.headers.Authorization = getAuthHeader(token);
            resolve(http(originalRequest));
          });
        });
      }
      return Promise.reject(error);
    },
  );
}

// Refresh a user's accessToken using their refreshToken
async function refreshAccessToken(store: any): Promise<OauthToken> {
  try {
    const state: any = store.getState();
    const { userToken } = state.user;
    const { refreshToken } = userToken;
    const api = Axios.create({
      baseURL: `${Config.API_BASE_URL}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await api.post('oauth/token', {
      grant_type: 'refresh_token',
      client_id: Config.ECOONE_CLIENT_ID,
      refresh_token: refreshToken,
    });
    const parsedData = snakeToCamel(res.data);
    const { token } = parsedData.data;
    store.dispatch({ type: 'user/setToken', payload: token });
    return Promise.resolve(userToken);
  } catch (err) {
    logoutUser(store);
    return Promise.reject(err);
  }
}

// Convert snake_case to camelCase
function snakeToCamel(object: any): any {
  return CamelCaseConverter.convertKeys('camel', object);
}

// Get the auth header required for authenticated requests based on the userToken.
// If it's expired we refresh it using the refreshToken.
function getAuthHeader(userToken: OauthToken): string {
  const { tokenType, accessToken } = userToken;
  const authHeader = `${tokenType || 'Bearer'} ${accessToken}`;
  return authHeader;
}

// Logout the user in Redux and navigate to "Auth" flow
function logoutUser(store: any) {
  NavigationService.navigate('Auth');
  store.dispatch({ type: 'user/logoutUser' });
}

export default setupAxiosInterceptors;
