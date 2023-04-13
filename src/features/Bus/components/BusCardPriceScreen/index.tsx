import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Loader from '../../../../components/Loader';
import BusApi from '../../../../services/api/bus';
import Text from '../../../../components/Text';
import { useBusState } from '../../reducers/bus';
import { useUserState } from '../../../User/reducers';
import styles from './style.css';
import { getNumberString } from '../../../../utils/number';

export default function BusCardPriceScreen() {
  const busApi = new BusApi();
  const [busState] = useBusState();
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const { busCardPrices } = busState;

  async function fetchBusCardPrices() {
    await busApi.fetchBusCardPrices();
  }

  useEffect(() => {
    fetchBusCardPrices();
  }, [busCardPrices?.length]);

  return busCardPrices ? (
    <FlatList
      style={styles.container}
      data={busCardPrices}
      renderItem={({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.divider} />
            <Text bold="bold" style={styles.itemText}>{`${getNumberString(
              item.price,
              userLanguage,
            )} đ`}</Text>
          </View>
        );
      }}
      keyExtractor={({ id }) => id.toString()}
    />
  ) : (
    <View style={styles.loader}>
      <Loader />
    </View>
  );
}
