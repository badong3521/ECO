import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Chip from './components/Chip';
import styles from './style.css';
import { LanguageType } from '../../features/User/reducers';

interface ChipListProps {
  data: ReadonlyArray<any>;
  displayAttribute?: string; // Which attribute of item to display
  onSelectedItemChange?: (index: number, item: any) => void;
  selectedItem?: any;
  language?: LanguageType;
}

// Use this component for a horizontal list that has rounded corner item with text inside.
// When an item is selected, the onSelectedItemChange will be called with selected item's data.
export default function ChipList(props: ChipListProps) {
  const {
    data,
    displayAttribute,
    onSelectedItemChange,
    selectedItem,
    language,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onPress = (item: any, index: number) => {
    if (onSelectedItemChange && index === currentIndex) {
      onSelectedItemChange(-1, undefined);
      setCurrentIndex(-1);
      return;
    }
    if (onSelectedItemChange) {
      onSelectedItemChange(index, item);
    }
    setCurrentIndex(index);
  };

  // update selectedIndex if selectedItem is set
  useEffect(() => {
    if (selectedItem) {
      const selectedIndex = data.findIndex(item => {
        if (displayAttribute) {
          return item[displayAttribute] === selectedItem[displayAttribute];
        }
        return item === selectedItem;
      });
      setCurrentIndex(selectedIndex);
    } else {
      setCurrentIndex(-1);
    }
  }, [selectedItem]);

  function getDisplayItem(item: any): string {
    const value = displayAttribute ? item[displayAttribute] : item;
    if (language) {
      return value[language];
    }
    return value;
  }

  return (
    <FlatList
      contentContainerStyle={[styles.list]}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => (
        <Chip
          item={item}
          index={index}
          active={currentIndex === index}
          displayAttribute={getDisplayItem(item)}
          onPress={onPress}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
