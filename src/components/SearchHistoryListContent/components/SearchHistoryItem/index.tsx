import { View } from 'react-native';
import * as React from 'react';
import styles from './style.css';
import Text from '../../../Text';
import { applicationStyle } from '../../../../../style.css';
import TouchableComponent from '../../../TouchableComponent';

interface SearchHistoryItemProps {
  history: string;
  onSearchItemPress: (searchItem: string) => void;
}

// Display the search history address as text
export default function SearchHistoryItem(props: SearchHistoryItemProps) {
  const { history, onSearchItemPress } = props;

  const onPress = () => {
    onSearchItemPress(history);
  };

  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.container}>
        <Text style={applicationStyle.text}>{history}</Text>
      </View>
    </TouchableComponent>
  );
}
