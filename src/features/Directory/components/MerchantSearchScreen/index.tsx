import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { applicationColors } from '../../../../../style.css';
import SearchBar from '../../../../components/SearchBar';
import SearchingHistoryListContent from '../../../../components/SearchHistoryListContent';
import { CardType } from '../../../../components/Card/types';
import CardApi from '../../../../services/api/card';
import CardMerchant from '../../../../components/Card/components/CardMerchant';
import {
  ALL_CATEGORY_ID,
  useSearchHistoryState,
} from '../../../../components/SearchBar/reducers/searchHistory';
import styles from './style.css';
import EmptyContainer from '../DirectoryScreenContainer/components/EmptyContainer';
import Firebase from '../../../../services/firebase';

const DEBOUNCE_DURATION = 1000; // ms

interface PropTypes {
  navigation: any;
}

export default function MerchantSearchScreen(props: PropTypes) {
  const { navigation } = props;
  const categoryId = navigation.getParam('categoryId');
  const [textInput, setTextInput] = useState<string>();
  const [results, setResults] = useState<CardType[]>();
  const [searchHistoryState, searchHistoryActions] = useSearchHistoryState();
  const histories =
    searchHistoryState.directorySearchHistories[categoryId || ALL_CATEGORY_ID];
  const cardApi = new CardApi();
  const debounced = useDebouncedCallback(onTextChange, DEBOUNCE_DURATION);
  const i18n = useTranslation();

  async function onTextChange(input: string) {
    Firebase.track('search_merchant_finished', {});
    const res = await cardApi.fetchCardMerchant({
      page: 1,
      search: input,
      category: categoryId,
    });
    setTextInput(input);
    if (res.status === 'success') {
      setResults(res.result.data);
    } else {
      setResults(undefined);
    }
  }

  function onClearText() {
    setResults(undefined);
    setTextInput(undefined);
  }

  function onSubmitEditing(input: string) {
    searchHistoryActions.addDirectorySearchHistory({ categoryId, input });
  }

  function onSearchHistoryItemPress(history: string) {
    onTextChange(history);
  }

  return (
    <View style={styles.container}>
      <SearchBar
        leadingIcon="search"
        leadingSize={15}
        leadingIconPack="feather"
        leadingColor={applicationColors.neutral.shade500}
        autoFocus
        style={styles.searchBar}
        hintText={i18n.t(
          'features.directory.searchScreen.searchBarPlaceholder',
        )}
        text={textInput}
        onChangeText={input => debounced.callback(input)}
        onClearText={onClearText}
        onSubmitEditing={onSubmitEditing}
      />
      {!textInput || textInput.length === 0 ? (
        <SearchingHistoryListContent
          histories={histories || []}
          onSearchHistoryItemPress={onSearchHistoryItemPress}
        />
      ) : (
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContentContainer}
          data={results}
          renderItem={({ item: card }) => (
            <View style={styles.cardContainer}>
              <CardMerchant
                card={card}
                onCardPress={() => navigation.navigate('CardScreen', { card })}
              />
            </View>
          )}
          ListEmptyComponent={
            <EmptyContainer
              message={i18n.t('features.directory.searchScreen.noResult')}
            />
          }
        />
      )}
    </View>
  );
}
