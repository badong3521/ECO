import { UserTokenType, UserType } from '../../../features/User/types';
import {
  ApiFailureType,
  ApiListResType,
  ApiResType,
  ApiSuccessType,
} from './api';

type RequestForgotSuccessType = ApiSuccessType & {
  result: any;
};

type ResetPasswordSuccessType = ApiSuccessType & {
  result: {
    user: UserType;
  };
};

type VerifyOTPSuccessType = ApiSuccessType & {
  result: {
    user: UserType;
  };
};

type ActivateUserSuccessType = ApiSuccessType & {
  result: {
    user: UserType;
  };
};

export type SignInResponseType = {
  token: UserTokenType;
  user: UserType;
};

export type RequestForgotPasswordResponseType = {
  user: UserType;
};

export type HouseNotificationTypes = 'paymentReminderNotification';

export type PaymentNotificationSettingsType = {
  [key: string]: boolean;
};

export type EcoidResidencesType = {
  [key: string]: PaymentNotificationSettingsType;
};

export type NotificationSettingsType = {
  ecoparkNewsNotification?: boolean;
  ecopmNewsNotification?: boolean;
  ecoidResidences?: EcoidResidencesType;
};

export type SignInType = ApiResType<SignInResponseType>;
export type ForgotPasswordType = ApiResType<UserType>;
export type SignUpType = ApiResType<UserType>;
export type ResetPasswordType = ResetPasswordSuccessType | ApiFailureType;
export type UpdatePasswordType = ApiSuccessType | ApiFailureType;
export type RequestForgotPasswordType = ApiResType<
  RequestForgotPasswordResponseType
>;
export type UpdateUserProfileType = ApiListResType<UserType>;
export type UserInfoType = ApiResType<UserType>;
export type VerifyOTPType = VerifyOTPSuccessType | ApiFailureType;
export type ActivateUserType = ActivateUserSuccessType | ApiFailureType;
