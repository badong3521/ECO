import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressInfoType } from '../../../services/api/types/bus';
import { useSearchHistoryState } from '../../../components/SearchBar/reducers/searchHistory';

export enum SearchState {
  NONE,
  SEARCHING,
  GET_RESULT,
}

export interface StandardSearchState {
  searchState: SearchState;
  addressInfo?: AddressInfoType;
}

const initialState: StandardSearchState = {
  searchState: SearchState.NONE,
  addressInfo: undefined,
};

const standardSearchSlice = createSlice({
  name: 'standardSearch',
  initialState,
  reducers: {
    setSearchState(state, action: PayloadAction<SearchState>) {
      state.searchState = action.payload;
    },
    setAddressInfo(state, action: PayloadAction<AddressInfoType | undefined>) {
      state.addressInfo = action.payload;
    },
  },
});

export function useStandardSearchState() {
  const standardSearchState = useSelector((state: any) => {
    return state.standardSearch;
  });
  const dispatch = useDispatch();
  const [, searchHistoryAction] = useSearchHistoryState();
  const standardSearchActions = {
    setSearchState: (payload: SearchState) =>
      dispatch(standardSearchSlice.actions.setSearchState(payload)),
    setAddressInfo: (payload: AddressInfoType | undefined) => {
      if (payload && payload.location && payload.location.address) {
        searchHistoryAction.addBusSearchHistory(payload.location.address);
      }
      return dispatch(standardSearchSlice.actions.setAddressInfo(payload));
    },
  };
  return [standardSearchState, standardSearchActions];
}

export default standardSearchSlice;
