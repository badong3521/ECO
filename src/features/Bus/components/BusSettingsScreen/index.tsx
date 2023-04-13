import React from 'react';
import { FlatList, View } from 'react-native';
import { useBusSettingsState } from '../../reducers';
import BusSettingsItem from './components/BusSettingsItem';
import {
  BusSettingsOption,
  BusSettingsOptionsType,
} from '../../reducers/busSettings';

import styles from './style.css';

interface BusSettingsScreenProps {
  navigation: any;
}

// List settings options for Ecobus
export default function BusSettingsScreen(props: BusSettingsScreenProps) {
  const { navigation } = props;
  const [busSettingsState, busSettingsActions] = useBusSettingsState();

  function onItemClick(item: BusSettingsOption) {
    if (item.navigateTo) navigation.navigate(item.navigateTo);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(busSettingsState)}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={item => {
          const option = item.item as BusSettingsOptionsType;
          return (
            <BusSettingsItem
              item={busSettingsState[option]}
              onItemClick={onItemClick}
              onEnableChange={() => {
                busSettingsActions.toggleSetting(option);
              }}
            />
          );
        }}
      />
    </View>
  );
}
