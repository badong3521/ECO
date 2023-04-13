// eslint-disable-next-line import/no-cycle
import { UserType } from '../../../features/User/types';
import { applicationColors } from '../../../../style.css';
import { Multilanguage } from '../../../services/api/types/api';
import { RegionType } from '../../../services/api/types/ecoparkRegion';

export type PromotionTypes =
  | 'buy_get'
  | 'percent_off'
  | 'percent_off_upto'
  | 'only_from'
  | 'same_price'
  | 'lixi'
  | 'gift'
  | 'voucher';

export interface CategoryType {
  id: number;
  name: Multilanguage;
  image: string;
  cover: string;
  subName?: Multilanguage;
  color?: string;
  subcategories?: SubcategoryType[];
  hasNewMerchant?: boolean;
  hasPromotedMerchant?: boolean;
  textColor?: string;
}

export interface SubcategoryType {
  id: number;
  name: Multilanguage;
  image: string;
  orderBy: number;
  backgroundColor: string;
}

export type CardTypes =
  | 'CardMerchant'
  | 'CardEvent'
  | 'CardNews'
  | 'CardPromotion'
  | 'CardUpcoming';

export const CardTypesColor = {
  CardMerchant: applicationColors.semantic.error.shade500,
  CardEvent: applicationColors.semantic.error.shade500,
  CardNews: applicationColors.semantic.info.shade500,
  CardPromotion: applicationColors.semantic.info.shade500,
};

interface SocialType {
  facebook?: string;
  instagram?: string;
}

export interface PromotionType {
  id: number;
  startTime: string;
  endTime: string;
  merchant: MerchantType;
  promotionType: PromotionTypes;
  buyGetBuy?: number;
  buyGetFree?: number;
  percentOff?: number;
  percentOffUpto?: number;
  onlyFrom?: number;
  samePrice?: number;
  lixiAmount?: string;
}

interface ColorSchemeType {
  id: number;
  primary: string;
  secondary: string;
}

export interface PhotoType {
  photoUrl: string;
  photoSmUrl?: string;
}

export interface MerchantType {
  id: number;
  name: string;
  email: string;
  street: string;
  streetNumber: string;
  phoneNumber: string;
  openingTime: string;
  closingTime: string;
  logo: string;
  profileCard: CardType;
  cards: CardType[];
  images?: PhotoType[];
  isOfficial: boolean;
  hasNews?: boolean;
  hasEvents?: boolean;
  hasPromotion?: boolean;
  merchantOpeningTime: MerchantOpeningTimeType;
}

export interface MerchantOpeningTimeType {
  allSelected?: boolean;
  allOpeningTime?: string;
  allClosingTime?: string;
  monSelected?: boolean;
  monOpeningTime?: string;
  monClosingTime?: string;
  tueSelected?: boolean;
  tueOpeningTime?: string;
  tueClosingTime?: string;
  wedSelected?: boolean;
  wedOpeningTime?: string;
  wedClosingTime?: string;
  thuSelected?: boolean;
  thuOpeningTime?: string;
  thuClosingTime?: string;
  friSelected?: boolean;
  friOpeningTime?: string;
  friClosingTime?: string;
  satSelected?: boolean;
  satOpeningTime?: string;
  satClosingTime?: string;
  sunSelected?: boolean;
  sunOpeningTime?: string;
  sunClosingTime?: string;
}

interface EventType {
  title: string;
  latitude: string;
  longitude: string;
  address: string;
  startTime: string;
  endTime?: string;
  ecoparkRegion?: RegionType;
}

export interface TwoDimensionalType {
  width: number;
  height: number;
}

export interface CardType {
  id: number;
  title: string;
  photoCover: string;
  description: string;
  phoneNumber?: string;
  websiteLink?: string;
  createdAt: string;
  expiry?: string;
  featured?: boolean;
  latitude?: string;
  longitude?: string;
  social?: SocialType;
  showCoverPhoto?: boolean;
  type: CardTypes;
  category: CategoryType;
  merchant?: MerchantType;
  event?: EventType;
  photoDimensions: TwoDimensionalType;
  aspectRatio?: number;
  user: UserType;
  promotion?: PromotionType;
  colorScheme?: ColorSchemeType;
  photoFeatured?: string;
  isOffical?: boolean;
  bookmarked: boolean;
  bookmarkCount: number;
  subcategories?: SubcategoryType[];
}

export const CardIconNameType = {
  CardMerchant: 'store-mall-directory',
  CardEvent: 'event',
  CardNews: 'import-contacts',
};
