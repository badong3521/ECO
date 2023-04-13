import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import FilterAccordion from './components/FilterAccoridion';
import styles from './style.css';
import EcoIdApi, { PaymentHistoryParams } from '../../../../services/api/ecoId';
import { BillTypes, SortTypes } from '../../../../services/api/types/ecoid';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import { START_PAGE } from '../../../../services/api/types/api';
import Loader from '../../../../components/Loader';
import { applicationColors } from '../../../../../style.css';
import { BillsOfMonthType, groupBillsByMonth } from '../../../../utils/ecoId';
import PaidBillsOfMonthAccordion from './components/PaidBillsOfMonthAccordion';
import Firebase from '../../../../services/firebase';

interface EcoIdPaymentHistoryScreenProps {
  navigation: any;
}

const ecoIdApi = new EcoIdApi();

// Contain all paid bills of a household. Can sort and filter by billType
export default function EcoIdPaymentHistoryScreen(
  props: EcoIdPaymentHistoryScreenProps,
) {
  const { navigation } = props;
  const [billsData, setBillsData] = useState<{
    totalPages: number;
    bills: BillsOfMonthType;
  }>({
    bills: {},
    totalPages: 0,
  });
  const { residenceId, paidMonths } = navigation.state.params;

  const [params, setParams] = useState<PaymentHistoryParams>({
    page: START_PAGE,
    residentId: residenceId,
    orderBy: 'DESC',
    filterBy: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  function onEndReached() {
    if (!loading && params.page < billsData?.totalPages) {
      fetchTransactions({
        ...params,
        page: params.page + 1,
      });
    }
  }

  function onRefresh() {
    fetchTransactions({
      ...params,
      page: START_PAGE,
    });
  }

  function onFilterUpdated(sort: SortTypes, filterBy: BillTypes[]) {
    Firebase.track('filter_payment_history', {
      value: filterBy?.join(','),
    });
    fetchTransactions({
      ...params,
      page: START_PAGE,
      orderBy: sort,
      filterBy,
    });
  }

  async function fetchTransactions(historyParams: PaymentHistoryParams) {
    setParams(historyParams);
    setLoading(true);
    const res = await ecoIdApi.fetchPaidBills(historyParams);
    setLoading(false);
    if (res.status === 'success') {
      const billOfMonths = groupBillsByMonth(
        res.result.data,
        historyParams.page === START_PAGE ? undefined : billsData.bills,
      );
      setBillsData({
        bills: billOfMonths,
        totalPages: res.result.totalPages,
      });
    }
  }

  function renderBillItem(item: ListRenderItemInfo<string>) {
    return (
      <PaidBillsOfMonthAccordion
        month={item.item}
        bills={billsData.bills[item.item]}
        /* eslint-disable-next-line react/prop-types */
        expanded={!!paidMonths && paidMonths.includes(item.item)}
      />
    );
  }

  function renderFooter() {
    if (params.page < billsData.totalPages) {
      return (
        <Loader
          style={styles.footer}
          color={applicationColors.semantic.info.shade500}
        />
      );
    }
    return undefined;
  }

  useEffect(() => {
    fetchTransactions(params);
  }, []);

  useStatusBar('dark-content');

  return (
    <View style={styles.root}>
      <FilterAccordion
        onBackPress={() => navigation.goBack()}
        sort={params.orderBy}
        filterBy={params.filterBy}
        onFilterUpdated={onFilterUpdated}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading && params.page === START_PAGE}
        onRefresh={onRefresh}
        style={styles.list}
        data={billsData.bills ? Object.keys(billsData.bills) : []}
        renderItem={renderBillItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        removeClippedSubviews={false}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
}
