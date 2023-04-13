import { FlatList, View } from 'react-native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../Text';
import styles from './style.css';
import SearchHistoryItem from './components/SearchHistoryItem';

interface SearchingProps {
  histories: string[];
  onSearchHistoryItemPress: (address: string) => void;
}

// show list search history: maximum is 5 items
export default function SearchingHistoryListContent(props: SearchingProps) {
  const { histories, onSearchHistoryItemPress } = props;
  const int18 = useTranslation();

  const onSearchItemPress = (searchHistory: string) => {
    onSearchHistoryItemPress(searchHistory);
  };

  return (
    <View>
      <Text style={styles.label} fontSize="tiny">
        {int18.t('features.busScreen.searchDirection.recents')}
      </Text>
      {histories.length > 0 ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          style={styles.list}
          data={histories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <SearchHistoryItem
              history={item.item}
              onSearchItemPress={onSearchItemPress}
            />
          )}
        />
      ) : (
        <Text style={styles.noHistory}>
          {int18.t('features.busScreen.searchDirection.noSearchHistory')}
        </Text>
      )}
    </View>
  );
}
