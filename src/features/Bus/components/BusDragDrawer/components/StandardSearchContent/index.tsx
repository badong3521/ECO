import React from 'react';
import { Keyboard, View } from 'react-native';
import SearchingHistoryListContent from '../../../../../../components/SearchHistoryListContent';
import SearchDestinationResultContent from '../SearchDestinationResultContent';
import { useSearchHistoryState } from '../../../../../../components/SearchBar/reducers/searchHistory';
import {
  SearchState,
  useStandardSearchState,
} from '../../../../reducers/standardSearch';
import GoogleLocationApi from '../../../../../../services/api/google';

// Render a default search bar
export default function StandardSearchContent() {
  const [historyState] = useSearchHistoryState();
  const [standardSearchState, standardSearchActions] = useStandardSearchState();
  const googleLocationApi = new GoogleLocationApi();

  const onSearchAddress = async (t: string) => {
    Keyboard.dismiss();
    if (t.length > 0) {
      standardSearchActions.setSearchState(SearchState.GET_RESULT);
      const data = await googleLocationApi.searchAddressByName(t, true);
      if (data.status === 'success') {
        standardSearchActions.setAddressInfo(data.result.data);
      } else {
        standardSearchActions.setAddressInfo(undefined);
      }
    }
  };

  return (
    <View>
      {standardSearchState.searchState === SearchState.SEARCHING && (
        <SearchingHistoryListContent
          histories={historyState.busSearchHistories}
          onSearchHistoryItemPress={onSearchAddress}
        />
      )}
      {standardSearchState.searchState === SearchState.GET_RESULT && (
        <SearchDestinationResultContent />
      )}
    </View>
  );
}
