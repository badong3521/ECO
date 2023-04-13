// eslint-disable-next-line import/no-cycle
import { CardType } from '../../../components/Card/types';

export type GenderType = 'male' | 'female' | 'unknown';
export const ListGenders: GenderType[] = ['male', 'female'];

export interface RatingType {
  score: number;
  comment: string;
}

export interface UserTokenType {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
}

export interface UserType extends UserTypeShort {
  initials?: string;
  profileImage?: string;
  notifications: any[];
  cards?: CardType[];
  coverPhoto?: string;
  phoneNumber?: string;
  dob?: string;
  status?: 'active' | 'inactive';
  resetPasswordToken?: string;
  description?: string;
  provider?: 'google_oauth2' | 'facebook' | 'apple';
  isResident?: boolean;
  token: UserTokenType; // API signIn. signUp and signInWithThirdParties return `token` in `user`
  ecoid?: number;
  syncedEcoid?: boolean;
  reachedAppOnboardingScreen: boolean;
  unreadNotificationTotal: number;
  lastVersionRating?: RatingType;
}

export interface UserTypeShort {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  gender: GenderType;
}
