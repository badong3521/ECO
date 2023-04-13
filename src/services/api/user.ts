import Config from 'react-native-config';
import { ImagePickerResponse } from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';
import Api from './api';
import {
  ActivateUserType,
  ForgotPasswordType,
  NotificationSettingsType,
  RequestForgotPasswordResponseType,
  RequestForgotPasswordType,
  ResetPasswordType,
  SignInResponseType,
  SignInType,
  SignUpType,
  UpdatePasswordType,
  UpdateUserProfileType,
  UserInfoType,
  VerifyOTPType,
} from './types/user';
import { UserType, GenderType, RatingType } from '../../features/User/types';
import { ApiReqType, ApiResType } from './types/api';

import { DeviceToken, LanguageType } from '../../features/User/reducers';

export type ThirdPartyProvider = 'google_oauth2' | 'facebook' | 'apple';

export interface UpdatePasswordParamsType {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export interface ForgotPasswordParamsType {
  phoneNumber: string;
}

export interface ActiveUserParamsType {
  phoneNumber: string;
  isResident?: boolean;
  termsOfService?: boolean;
}

export interface ResetPasswordParamsType {
  password: string;
  passwordConfirmation: string;
  resetPasswordToken: string;
}

export interface SignInParamsType {
  phoneNumber: string;
  password: string;
}

export interface SignUpParamsType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  passwordConfirmation?: string;
  termsOfService?: boolean;
}

export interface UpdateProfileParamsType {
  userId: number | string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  birthday?: Date;
  avatar?: ImagePickerResponse;
  email?: string;
  ecoparkRegionId?: string | null;
  interestsList?: string[];
  locale?: LanguageType;
  gender?: GenderType;
  reachedAppOnboardingScreen?: boolean;
}

type SignInWithThirdPartiesParamsType = {
  provider: ThirdPartyProvider;
  token: string;
};

export default class UserApi extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'users';
  }

  // Sign in user, track in Firebase, and set in store
  async signIn(params: SignInParamsType): Promise<SignInType> {
    const res = await this.request<SignInResponseType>({
      path: 'oauth/token',
      method: 'POST',
      params: {
        grant_type: 'password',
        client_id: Config.ECOONE_CLIENT_ID,
        ...params,
      },
      eventId: 'sign_in_finished',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setUser',
        payload: res.result.data.user,
      });
      this.store.dispatch({
        type: 'user/setToken',
        payload: res.result.data.token,
      });
      this.updateFcmDeviceToken();
    }
    return res;
  }

  // Allows a user to sign in using an OTP. This is a 1 time solution as the OTP is invalidated.
  // This is used for example in the forgot password flow.
  async signInOtp(userId: number, otp: string): Promise<ForgotPasswordType> {
    const res = await this.request<UserType>({
      path: `users/${userId}/otp/${otp}/token`,
      params: {
        client_id: Config.ECOONE_CLIENT_ID,
      },
      method: 'POST',
      eventId: 'otp_finished',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setUser',
        payload: res.result.data,
      });
      this.store.dispatch({
        type: 'user/setToken',
        payload: res.result.data.token,
      });
      this.updateFcmDeviceToken();
    }
    return res;
  }

  // Attempt to sign up user
  async signUp(params: SignUpParamsType): Promise<SignUpType> {
    params.passwordConfirmation = params.password;
    const res = await this.request<UserType>({
      path: this.path,
      method: 'POST',
      body: {
        client_id: Config.ECOONE_CLIENT_ID,
        ...params,
      },
      eventId: 'sign_up_finished',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setUser',
        payload: res.result.data,
      });
      this.store.dispatch({
        type: 'user/setToken',
        payload: res.result.data.token,
      });
      this.updateFcmDeviceToken();
    }
    return res;
  }

  async signInWithThirdParties(
    params: SignInWithThirdPartiesParamsType,
  ): Promise<SignUpType> {
    console.log('params AUTH', params);
    const res = await this.request<UserType>({
      path: `${this.path}/social_oauths`,
      method: 'POST',
      params: {
        client_id: Config.ECOONE_CLIENT_ID,
        ...params,
      },
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setSignedInWithThirdParties',
        payload: true,
      });
      this.store.dispatch({
        type: 'user/setUser',
        payload: res.result.data,
      });
      this.store.dispatch({
        type: 'user/setToken',
        payload: res.result.data.token,
      });
      this.updateFcmDeviceToken();
    }
    return res;
  }

  async verifyOTP(OTP: string): Promise<VerifyOTPType> {
    const state = this.store.getState();
    const { user } = state;
    const res = await this.request<UserType>({
      path: `${this.path}/${user?.user?.id}/activate`,
      method: 'PATCH',
      params: {
        otp_code: OTP,
      },
      eventId: 'otp_finished',
    });
    return res;
  }

  async activateUser(params: ActiveUserParamsType): Promise<ActivateUserType> {
    const { phoneNumber, isResident } = params;
    const state = this.store.getState();
    const { user } = state;
    const res = await this.request<UserType>({
      path: `${this.path}/${user?.user?.id}/activate`,
      method: 'POST',
      body: {
        phone_number: phoneNumber,
        is_resident: isResident,
      },
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setUser',
        payload: res.result.data,
      });
      this.updateFcmDeviceToken();
    }
    return res;
  }

  async updateUserProfile(
    params: UpdateProfileParamsType,
  ): Promise<UpdateUserProfileType> {
    const { avatar, userId } = params;
    let body: any;
    if (avatar) {
      body = new FormData();
      body.append('avatar', {
        uri: avatar.uri,
        type: 'image/jpg',
        name: Date.now().toString(),
      });
    } else {
      body = params;
    }
    const res = await this.request<UserType>({
      path: `${this.path}/${userId}`,
      method: 'PATCH',
      body,
      headers: {
        'Content-Type': avatar ? 'multipart/form-data' : 'application/json',
      },
      eventId: avatar
        ? 'update_profile_picture_finished'
        : 'update_profile_finished',
    });
    if (res.status === 'success') {
      this.store.dispatch({
        type: 'user/setUser',
        payload: res.result.data,
      });
    }
    return res;
  }

  // Start forgotPassword flow by requesting a forgot password email
  async requestForgotPassword(
    phoneNumber: string,
  ): Promise<RequestForgotPasswordType> {
    const res = await this.request<RequestForgotPasswordResponseType>({
      path: `${this.path}/password_reset`,
      method: 'POST',
      params: {
        phoneNumber,
      },
      eventId: 'request_forgot_password',
    });
    return res;
  }

  // Update users password from reset password flow
  async resetPassword(
    params: ResetPasswordParamsType,
  ): Promise<ResetPasswordType> {
    const res = await this.request<any>({
      path: `${this.path}/password_reset`,
      method: 'PATCH',
      params: {
        password_reset_token: params.resetPasswordToken,
        password: params.password,
        password_confirmation: params.passwordConfirmation,
      },
      eventId: 'forgot_password_finished',
    });
    return res;
  }

  async fetchUserInfo(userId: number): Promise<UserInfoType> {
    const response = await this.request<UserType>({
      path: `${this.path}/${userId}`,
      method: 'GET',
    });
    return response;
  }

  async fetchMyInfo(): Promise<ApiResType<UserType>> {
    const response = await this.request<UserType>({
      path: `${this.path}/me`,
      method: 'GET',
    });
    if (response.status === 'success') {
      this.store.dispatch({
        type: 'user/setUser',
        payload: response.result.data,
      });
    }
    return response;
  }

  async rateApp(rating: RatingType): Promise<ApiResType<any>> {
    const res = await this.request<UserType>({
      path: `${this.path}/rate_app`,
      method: 'POST',
      body: {
        ...rating,
      },
    });
    return res;
  }

  // Update users password from reset password flow
  async updatePassword(
    params: UpdatePasswordParamsType,
  ): Promise<UpdatePasswordType> {
    const state = this.store.getState();
    const { user } = state;
    const { id } = user.user;
    const res = await this.request<ApiReqType>({
      path: `${this.path}/${id}/password_update`,
      method: 'PATCH',
      params,
      eventId: 'update_password_finished',
    });
    return res;
  }

  // revoke user token
  async revokeToken(token: string) {
    await this.revokeFcmDeviceToken();
    await this.request<ApiReqType>({
      path: `oauth/revoke`,
      method: 'POST',
      params: {
        token,
      },
      eventId: 'sign_out',
    }).then(rs => {
      if (rs.status === 'success') {
        this.store.dispatch({
          type: 'user/logoutUser',
        });
      }
    });
  }

  // Update FCM device token to receive notification
  // if isRevoke, will update token = undefined
  async updateFcmDeviceToken(): Promise<ApiResType<any>> {
    try {
      const deviceToken = await messaging().getToken();
      const state = this.store.getState();
      const { user } = state;
      // need to update the current locale if user changed language in signUp screen
      this.updateUserProfile({
        userId: user.user?.id,
        locale: user.userLanguage,
      });
      const res = await this.request<DeviceToken>({
        path: `${this.path}/${user.user?.id}/fcm_device_tokens`,
        method: 'POST',
        params: {
          deviceToken,
        },
      });
      if (res.status === 'success') {
        this.store.dispatch({
          type: 'user/setDeviceToken',
          payload: res.result.data,
        });
      }
      return res;
    } catch (err) {
      const errors = this.handleError(err?.response?.data);
      return {
        status: 'failed',
        errors,
        statusCode: err?.response?.status,
      };
    }
  }

  // revoke FCM device token
  async revokeFcmDeviceToken(): Promise<ApiResType<any>> {
    try {
      const state = this.store.getState();
      const { user } = state;
      return await this.request<any>({
        path: `${this.path}/${user.user?.id}/fcm_device_tokens/${user?.deviceToken?.id}`,
        method: 'DELETE',
      });
    } catch (err) {
      const errors = this.handleError(err.response.data);
      return {
        status: 'failed',
        errors,
        statusCode: err?.response?.status,
      };
    }
  }

  async fetchNotificationSettings(): Promise<void> {
    const state = this.store.getState();
    const { user } = state;
    const response = await this.request<NotificationSettingsType>({
      path: `${this.path}/${user.user?.id}/settings`,
      method: 'GET',
    });
    if (response.status === 'success') {
      this.store.dispatch({
        type: 'user/setNotificationSettings',
        payload: response.result.data,
      });
    }
  }

  async updateNotificationSettings(
    params: NotificationSettingsType,
  ): Promise<ApiResType<NotificationSettingsType>> {
    const state = this.store.getState();
    const { user } = state;
    const { id } = user.user;
    const response = await this.request<NotificationSettingsType>({
      path: `${this.path}/${id}/settings`,
      method: 'PATCH',
      params,
    });
    if (response.status === 'success') {
      this.store.dispatch({
        type: 'user/setNotificationSettings',
        payload: response.result.data,
      });
    }
    return response;
  }
}
