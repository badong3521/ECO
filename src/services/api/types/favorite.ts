import { ApiResType } from './api';
import { CardType } from '../../../components/Card/types';

export interface FavoriteCard {
  id: number;
  card: CardType;
}

export type FetchFavoritesType = ApiResType<FavoriteCard[]>;
