import React from 'react';
import { View } from 'react-native';
import i18n from 'i18next';
import { useUserState } from '../../../User/reducers';
import { BillType } from '../../../../services/api/types/dncEcoid';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import { getNumberString } from '../../../../utils/number';

import styles from './style.css';

interface Props {
  bill: BillType;
  inList?: boolean;
  navigation: any;
  children?: React.ReactNode;
}

export default function BillDetails(props: Props) {
  const { bill, inList, navigation, children } = props;
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const total = getNumberString(bill.debtPay || 0, userLanguage);

  return (
    <View style={styles.itemContainer} key={bill.billId}>
      <Text>
        {i18n.t('features.electricBill.listBills.billTitle', {
          month: bill.month,
          year: bill.year,
        })}
      </Text>
      <View style={styles.customerDetails}>
        <View style={styles.detailsRow}>
          <Text color="darkGreyV2">
            {i18n.t('features.electricBill.listBills.customerCode')}
          </Text>
          <Text style={styles.detailContent}>{bill.customerCode}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text color="darkGreyV2">
            {i18n.t('features.electricBill.listBills.customerName')}
          </Text>
          <Text style={styles.detailContent}>{bill.customerName}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text color="darkGreyV2">
            {i18n.t('features.electricBill.listBills.customerAddress')}
          </Text>
          <Text style={styles.detailContent}>{bill.customerAddress}</Text>
        </View>
        { !inList && (
          <View style={styles.detailsRow}>
            <Text color="darkGreyV2">
              {i18n.t('features.electricBill.listBills.totalPay')}
            </Text>
            <Text style={styles.detailContent} bold="bold">
              {i18n.t('features.electricBill.listBills.totalVnd', { total })}
            </Text>
          </View>
        )}
      </View>
      { inList && (
        <View style={styles.payNow}>
          <View style={styles.totalDetails}>
            <Text color="darkGreyV2">
              {i18n.t('features.electricBill.listBills.totalPay')}
            </Text>
            <Text fontSize="large" bold="bold" style={styles.totalNumber}>
              {i18n.t('features.electricBill.listBills.totalVnd', { total })}
            </Text>
          </View>
          <View style={styles.totalDetailsBtn}>
            <Button
              type="primary"
              title={i18n.t('features.electricBill.listBills.payNow')}
              onPress={() => navigation.navigate('DncBillPrePaymentScreen', {bill})}
              uppercase={false}
            />
          </View>
        </View>
      )}

      { children }
    </View>
  )
}
