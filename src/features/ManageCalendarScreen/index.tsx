import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { HandoverAppartmentType } from 'features/Csm/types';
import CSMApi from 'services/api/csm';
import EmptyContainer from 'features/Directory/components/DirectoryScreenContainer/components/EmptyContainer';
import ListEmptyImage from 'assets/images/list_empty.svg';
import Text from 'components/Text';
import IconComponent from 'components/Icon';
import { ScreenProps } from 'services/api/types/navigation';
import { withNavigationFocus } from 'react-navigation';
import styles from './style.css';
import HandoverAppartmentItem from './components/HandoverAppartment';

const csmApi = new CSMApi();

const ManageCalendarScreen = ({ navigation, isFocused }: ScreenProps) => {
  const i18n = useTranslation();
  const [listHandoverAppartment, setListHandoverAppartment] = useState<
    HandoverAppartmentType[]
  >();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  async function fetchData() {
    setRefreshing(true);
    const res = await csmApi.fetchListHandoverAppartment();
    setRefreshing(false);
    setListHandoverAppartment(
      res.status === 'success' ? [...res.result.data] : [],
    );
  }

  const renderItem = ({ item }: { item: HandoverAppartmentType }) => {
    return <HandoverAppartmentItem item={item} />;
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}
        activeOpacity={0.6}
      >
        <IconComponent
          iconPack="feather"
          name="chevron-left"
          size={26}
          color="#000"
        />
      </TouchableOpacity>
      <Text bold="semiBold" style={styles.header}>
        Quản lý đặt lịch bàn giao
      </Text>
      <FlatList
        data={listHandoverAppartment}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onRefresh={fetchData}
        refreshing={refreshing}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          !refreshing ? (
            <EmptyContainer
              style={{ marginTop: '10%' }}
              message={i18n.t('features.directory.filters.noResult')}
              image={<ListEmptyImage />}
            />
          ) : (
            undefined
          )
        }
      />
    </View>
  );
};

export default withNavigationFocus(ManageCalendarScreen);
