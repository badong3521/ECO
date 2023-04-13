import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType, CategoryType } from '../../../components/Card/types';

export interface DirectoryState {
  cards: CardType[];
  searchCards: CardType[];
  categories?: CategoryType[];
  favoritesCount: number;
}

const initialState: DirectoryState = {
  cards: [],
  searchCards: [],
  categories: undefined,
  favoritesCount: 0,
};

const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<CardType[]>) {
      state.cards = action.payload;
    },
    addCards(state, action: PayloadAction<CardType[]>) {
      state.cards = [...state.cards, ...action.payload];
    },
    setSearchCards(state, action: PayloadAction<CardType[]>) {
      state.searchCards = action.payload;
    },
    addSearchCards(state, action: PayloadAction<CardType[]>) {
      state.searchCards = [...state.cards, ...action.payload];
    },
    setCategories(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload;
    },
    setFavoritesCount(state, action: PayloadAction<number>) {
      state.favoritesCount = action.payload;
    },
    addAFavorite(state) {
      state.favoritesCount += 1;
    },
    removeAFavorite(state) {
      state.favoritesCount -= 1;
    },
  },
});

export function useDirectoryState() {
  const directoryState = useSelector(
    (state: any) => state.directory,
  ) as DirectoryState;
  const dispatch = useDispatch();
  const actions = {
    setCards: (payload: CardType[]) =>
      dispatch(directorySlice.actions.setCards(payload)),
    addCards: (payload: CardType[]) =>
      dispatch(directorySlice.actions.addCards(payload)),
    setSearchCards: (payload: CardType[]) =>
      dispatch(directorySlice.actions.setSearchCards(payload)),
    addSearchCards: (payload: CardType[]) =>
      dispatch(directorySlice.actions.addSearchCards(payload)),
    setCategories: (payload: CategoryType[]) =>
      dispatch(directorySlice.actions.setCategories(payload)),
    setFavoritesCount: (payload: number) =>
      dispatch(directorySlice.actions.setFavoritesCount(payload)),
    addAFavorite: () => dispatch(directorySlice.actions.addAFavorite()),
    removeAFavorite: () => dispatch(directorySlice.actions.removeAFavorite()),
  };
  return [directoryState, actions] as [typeof directoryState, typeof actions];
}

export default directorySlice;
