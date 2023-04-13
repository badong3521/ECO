import { useDispatch, useSelector } from 'react-redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import crashlytics from '@react-native-firebase/crashlytics';
import { NativeModules, Platform } from 'react-native';
import { UserType } from '../types';
import i18n from '../../../i18n';
import { BusCardType } from '../../../services/api/types/busCardType';
import { FavoriteLocationType } from '../../../services/api/types/favoriteLocation';
import Firebase from '../../../services/firebase';
import { RegionType } from '../../../services/api/types/ecoparkRegion';
import { NotificationSettingsType } from '../../../services/api/types/user';
import { BookmarkOverviewType } from '../../../services/api/types/bookmark';
import { Tooltip } from '../../../services/api/types/tooltip';

function getDeviceLocale(): LanguageType {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  const deviceLocale = locale ? locale.substring(0, 2) : undefined;
  return deviceLocale && deviceLocale === 'vi' ? 'vn' : 'en';
}

export function getUserFullNameByLocale(
  locale?: 'vn' | 'en',
  firstName?: string,
  lastName?: string,
) {
  const first = firstName || '';
  const last = lastName || '';
  return locale === 'vn' ? `${last} ${first}` : `${first} ${last}`;
}

export type LanguageType = 'en' | 'vn';
export type ResidenceType = 'resident' | 'visitor';
export const ListLanguages: LanguageType[] = ['en', 'vn'];

export interface DeviceToken {
  deviceToken: string;
  id: string;
}

export interface OauthToken {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  refreshToken: string;
  createdAt: number;
}

export interface UserState {
  user?: UserType;
  userToken?: OauthToken;
  isLoggedIn: boolean;
  userLanguage: LanguageType;
  busCards?: BusCardType[];
  favoriteBusLocations?: FavoriteLocationType[];
  userFullNameByLocale?: string;
  residenceType?: ResidenceType;
  signedInWithThirdParties?: boolean;
  reachedAppOnboardingScreen: boolean;
  deviceToken?: DeviceToken;
  ecoparkAreas?: RegionType[];
  notificationSettings?: NotificationSettingsType;
  shouldRefreshBookmarks?: boolean;
  bookmarkOverview?: BookmarkOverviewType;
  reloadUserDashboard?: boolean;
  tooltip?: Tooltip;
}

const initialState: UserState = {
  user: undefined,
  userToken: undefined,
  isLoggedIn: false,
  userLanguage: getDeviceLocale(),
  busCards: undefined,
  userFullNameByLocale: undefined,
  residenceType: undefined,
  signedInWithThirdParties: undefined,
  favoriteBusLocations: undefined,
  shouldRefreshBookmarks: false,
  bookmarkOverview: undefined,
  reachedAppOnboardingScreen: false,
  tooltip: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<OauthToken>) {
      state.userToken = action.payload;
      state.isLoggedIn = true;
    },
    setUser(state, action: PayloadAction<UserType>) {
      // track current user
      Firebase.setCurrentUser(action.payload?.id);
      const user = action.payload;
      // Set up some data to track if the current user crashes
      Promise.all([crashlytics().setUserId(user.id.toString())]);
      state.user = user;
      state.userFullNameByLocale = getUserFullNameByLocale(
        state.userLanguage,
        user.firstName!,
        user.lastName!,
      );
    },
    setDeviceToken(state, action: PayloadAction<DeviceToken>) {
      state.deviceToken = action.payload;
    },
    setUserLanguage(state, action: PayloadAction<LanguageType>) {
      i18n.changeLanguage(action.payload);
      state.userLanguage = action.payload;
      if (state.user) {
        state.userFullNameByLocale = getUserFullNameByLocale(
          action.payload,
          state.user.firstName!,
          state.user.lastName!,
        );
      }
    },
    logoutUser(state) {
      state.user = initialState.user;
      state.userToken = initialState.userToken;
      state.isLoggedIn = false;
      state.deviceToken = undefined;
    },
    setBusCards(state, action: PayloadAction<BusCardType[] | undefined>) {
      if (action.payload) {
        const busCards: BusCardType[] = [];
        // make sure that the primary card, if present, is always the first card on the list
        action.payload.forEach((card: BusCardType) => {
          if (card.primary) {
            busCards.unshift(card);
          } else {
            busCards.push(card);
          }
        });
        state.busCards = busCards;
      } else {
        state.busCards = action.payload;
      }
    },
    setFavoriteBusLocations(
      state,
      action: PayloadAction<FavoriteLocationType[] | undefined>,
    ) {
      state.favoriteBusLocations = action.payload;
    },
    setResidenceType(state, action: PayloadAction<ResidenceType | undefined>) {
      state.residenceType = action.payload;
    },
    setSignedInWithThirdParties(
      state,
      action: PayloadAction<boolean | undefined>,
    ) {
      state.signedInWithThirdParties = action.payload;
    },
    setEcoparkAreas(state, action: PayloadAction<RegionType[]>) {
      state.ecoparkAreas = action.payload;
    },
    setNotificationSettings(
      state,
      action: PayloadAction<NotificationSettingsType>,
    ) {
      state.notificationSettings = action.payload;
    },
    setShouldRefreshBookmarks(
      state,
      action: PayloadAction<boolean | undefined>,
    ) {
      state.shouldRefreshBookmarks = action.payload;
    },
    setBookmarkOverview(state, action: PayloadAction<BookmarkOverviewType>) {
      state.bookmarkOverview = action.payload;
    },
    setNumBookmarks(state, action: PayloadAction<number>) {
      if (state.bookmarkOverview) {
        state.bookmarkOverview = {
          ...state.bookmarkOverview,
          totalBookmarked: action.payload,
        };
      }
    },
    setReloadUserDashboard(state, action: PayloadAction<boolean>) {
      state.reloadUserDashboard = action.payload;
    },
    setTooltip(state, action: PayloadAction<Tooltip | undefined>) {
      state.tooltip = action.payload;
    },
  },
});

export function useUserState() {
  const userState = useSelector((state: any) => state.user) as UserState;
  const dispatch = useDispatch();
  const actions = {
    setToken: (payload: OauthToken) =>
      dispatch(userSlice.actions.setToken(payload)),
    setUser: (payload: UserType) =>
      dispatch(userSlice.actions.setUser(payload)),
    setDeviceToken: (payload: DeviceToken) =>
      dispatch(userSlice.actions.setDeviceToken(payload)),
    setUserLanguage: (payload: LanguageType) =>
      dispatch(userSlice.actions.setUserLanguage(payload)),
    logoutUser: () => dispatch(userSlice.actions.logoutUser()),
    setBusCards: (payload?: BusCardType[]) =>
      dispatch(userSlice.actions.setBusCards(payload)),
    setResidenceType: (payload?: ResidenceType) =>
      dispatch(userSlice.actions.setResidenceType(payload)),
    setSignedInWithThirdParties: (payload?: boolean) =>
      dispatch(userSlice.actions.setSignedInWithThirdParties(payload)),
    setFavoriteBusLocations: (payload?: FavoriteLocationType[]) =>
      dispatch(userSlice.actions.setFavoriteBusLocations(payload)),
    setEcoparkAreas: (payload: RegionType[]) =>
      dispatch(userSlice.actions.setEcoparkAreas(payload)),
    setNotificationSettings: (payload: NotificationSettingsType) =>
      dispatch(userSlice.actions.setNotificationSettings(payload)),
    setShouldRefreshBookmarks: (payload?: boolean) =>
      dispatch(userSlice.actions.setShouldRefreshBookmarks(payload)),
    setBookmarkOverview: (payload: BookmarkOverviewType) =>
      dispatch(userSlice.actions.setBookmarkOverview(payload)),
    setNumBookmarks: (payload: number) =>
      dispatch(userSlice.actions.setNumBookmarks(payload)),
    setReloadUserDashboard: (payload: boolean) =>
      dispatch(userSlice.actions.setReloadUserDashboard(payload)),
    setTooltip: (payload?: Tooltip) =>
      dispatch(userSlice.actions.setTooltip(payload)),
  };
  return [userState, actions] as [typeof userState, typeof actions];
}

export default userSlice;
