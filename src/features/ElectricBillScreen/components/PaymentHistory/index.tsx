import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import i18n from 'i18next';
import moment from 'moment';
import DncEcoidApi from '../../../../services/api/dncEcoid';
import Loader from '../../../../components/Loader';
import Text from '../../../../components/Text';

import { useUserState } from '../../../User/reducers';
import { TransactionHistoryType } from '../../../../services/api/types/dncEcoid';
import PaymentHistoryEmpty from '../PaymentHistoryEmpty';
import { getNumberString } from '../../../../utils/number';

import styles from './style.css';

const DateFormat = 'HH:mm DD-MM-yyyy';

const dncEcoidApi = new DncEcoidApi();

export default function PaymentHistory() {
  const [loading, setLoading] = useState(true);
  const [userState] = useUserState();
  const [transactions, setTransactions] = useState<TransactionHistoryType[]>();

  async function fetchPaymentHistory() {
    setLoading(true);
    const response = await dncEcoidApi.getPaymentHistory(
      userState.user?.ecoid!,
    );

    setLoading(false);
    if (response.status === 'success') {
      setTransactions(response.result.data.transactionHistories);
    }
  }

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  function renderTransaction(transaction: TransactionHistoryType) {
    const transactionDetail =
      transaction.transactionDetail && transaction.transactionDetail[0];

    return (
      <View style={styles.itemContainer} key={transaction.transactionId}>
        <View style={styles.headerRow}>
          <Text style={styles.headerDate}>
            {i18n.t('features.electricBill.paymentHistory.billTitle', {
              month: transactionDetail && transactionDetail.billDate,
            })}
          </Text>
          <Text fontSize="large" bold="bold">
            {i18n.t('features.electricBill.listBills.totalVnd', {
              total: getNumberString(
                parseInt(
                  (transactionDetail && transactionDetail.billAmount) || '0',
                  10,
                ),
                userState.userLanguage,
              ),
            })}
          </Text>
        </View>

        <View style={styles.customerDetails}>
          <View style={styles.detailsRow}>
            <Text color="darkGreyV2">
              {i18n.t('features.electricBill.listBills.customerCode')}
            </Text>
            <Text style={styles.detailContent}>{transaction.customerCode}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text color="darkGreyV2">
              {i18n.t('features.electricBill.listBills.customerName')}
            </Text>
            <Text style={styles.detailContent}>{transaction.customerName}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text color="darkGreyV2">
              {i18n.t('features.electricBill.listBills.customerAddress')}
            </Text>
            <Text style={styles.detailContent}>
              {transaction.customerAddress}
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text color="darkGreyV2">
              {i18n.t('features.electricBill.paymentHistory.paidAt')}
            </Text>
            <Text style={styles.detailContent}>
              {moment(transaction.transactionDate).format(DateFormat)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      {loading && <Loader style={styles.loading} />}
      {!loading && !transactions && <PaymentHistoryEmpty />}
      {!loading && transactions && (
        <ScrollView style={styles.container}>
          <Text
            fontSize="small"
            color="darkGrey"
            numberOfLines={2}
            style={styles.note}
          >
            {i18n.t('features.electricBill.paymentHistory.note')}
          </Text>

          {transactions.map(transaction => renderTransaction(transaction))}
        </ScrollView>
      )}
    </>
  );
}
