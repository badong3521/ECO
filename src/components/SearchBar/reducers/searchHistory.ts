import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SearchHistoryUtils from '../../../utils/searchHistory';

export const ALL_CATEGORY_ID = -1;

interface DirectorySearchHistory {
  [categoryId: number]: string[];
}

interface MerchantSearch {
  categoryId?: number;
  input: string;
}

export interface SearchHistoryState {
  busSearchHistories: string[];
  cardSearchHistories: string[];
  directorySearchHistories: DirectorySearchHistory;
}

const initialState: SearchHistoryState = {
  busSearchHistories: [],
  cardSearchHistories: [],
  directorySearchHistories: {},
};

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addBusSearchHistory(state, action: PayloadAction<string>) {
      state.busSearchHistories = SearchHistoryUtils.addSearchHistory<string>(
        state.busSearchHistories,
        action.payload,
      );
    },
    addCardSearchHistory(state, action: PayloadAction<string>) {
      state.cardSearchHistories = SearchHistoryUtils.addSearchHistory<string>(
        state.cardSearchHistories,
        action.payload,
      );
    },
    addDirectorySearchHistory(state, action: PayloadAction<MerchantSearch>) {
      const { categoryId = ALL_CATEGORY_ID, input } = action.payload;
      state.directorySearchHistories[
        categoryId
      ] = Object.prototype.hasOwnProperty.call(
        state.directorySearchHistories,
        categoryId,
      )
        ? SearchHistoryUtils.addSearchHistory<string>(
            state.directorySearchHistories[categoryId],
            input,
          )
        : [input];
      if (categoryId !== ALL_CATEGORY_ID) {
        state.directorySearchHistories[
          ALL_CATEGORY_ID
        ] = Object.prototype.hasOwnProperty.call(
          state.directorySearchHistories,
          ALL_CATEGORY_ID,
        )
          ? SearchHistoryUtils.addSearchHistory<string>(
              state.directorySearchHistories[ALL_CATEGORY_ID],
              input,
            )
          : [input];
      }
    },
  },
});

export function useSearchHistoryState() {
  const searchHistoryState = useSelector(
    (state: any) => state.searchHistory,
  ) as SearchHistoryState;
  const dispatch = useDispatch();
  const actions = {
    addBusSearchHistory: (payload: string) =>
      dispatch(searchHistorySlice.actions.addBusSearchHistory(payload)),
    addCardSearchHistory: (payload: string) =>
      dispatch(searchHistorySlice.actions.addCardSearchHistory(payload)),
    addDirectorySearchHistory: (payload: MerchantSearch) =>
      dispatch(searchHistorySlice.actions.addDirectorySearchHistory(payload)),
  };
  return [searchHistoryState, actions] as [
    typeof searchHistoryState,
    typeof actions,
  ];
}

export default searchHistorySlice;
