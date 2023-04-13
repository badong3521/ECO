import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../components/Text';
import EcoIdApi from '../../../../services/api/ecoId';
import {
  BillType,
  SelectedBillType,
} from '../../../../services/api/types/ecoid';
import BillsOfMonthAccordion from './components/BillsOfMonthAccordion';
import Button from '../../../../components/Button';
import { getNumberString } from '../../../../utils/number';
import Loader from '../../../../components/Loader';
import { applicationColors } from '../../../../../style.css';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import DialogManager from '../../../../components/Dialog/manager';
import useOnFocused from '../../../../utils/hooks/useOnFocused';
import { BillsOfMonthType, groupBillsByMonth } from '../../../../utils/ecoId';

interface EcoIdPreparePaymentScreenProps {
  navigation: any;
}

const ecoIdApi = new EcoIdApi();

// Show all bills of a household
// The bills will be grouped by month and user can select 1 or multi bills to pay,
// Then navigate user to OnePay site to pay
export default function EcoIdPreparePaymentScreen(
  props: EcoIdPreparePaymentScreenProps,
) {
  const { navigation } = props;
  const { residence } = navigation.state.params;
  const { residentId, areaName, locationCode } = residence;
  const [bills, setBills] = useState<BillsOfMonthType>();
  const [loading, setLoading] = useState<boolean>();
  const i18n = useTranslation();
  const [selectedBills, setSelectedBills] = useState<SelectedBillType>({});
  const billMonths = bills ? Object.keys(bills) : [];

  // get OnePay link to pay for selected bills
  async function onPaymentPress() {
    const billIds: string[] = [];
    Object.keys(selectedBills).forEach(billId => {
      if (selectedBills[billId]) {
        billIds.push(billId);
      }
    });
    setLoading(true);
    const res = await ecoIdApi.payments(residentId, billIds);
    setLoading(false);
    if (res.status === 'success') {
      navigation.navigate('EcoIdPaymentScreen', {
        paymentUri: res.result.data.uri,
        residentId,
        paidMonths: getMonthsOfBills(selectedBills),
      });
    } else {
      DialogManager.showErrorDialog({
        error: i18n.t(res.errors.toString()),
      });
    }
  }

  function onCheckedBill(checked: boolean, bill: BillType) {
    const tempsBills = {
      ...selectedBills,
    };
    const changedBills: BillType[] =
      bill.billType === 'VAT'
        ? bills![bill.billOfMonth].filter(b => b.billType === 'VAT')
        : [bill];

    changedBills.forEach(b => {
      if (checked) tempsBills[b.billId] = b;
      else tempsBills[b.billId] = undefined;
    });

    setSelectedBills(tempsBills);
  }

  function onMonthPress(month: string, checked: boolean) {
    if (bills && bills[month]) {
      const tempsBills = {
        ...selectedBills,
      };
      bills[month].forEach((bill: BillType) => {
        if (checked) {
          tempsBills[bill.billId] = bill;
        } else {
          tempsBills[bill.billId] = undefined;
        }
      });
      setSelectedBills(tempsBills);
    }
  }

  async function fetchBills() {
    const res = await ecoIdApi.fetchHouseholdBills(residentId);
    if (res.status === 'success') {
      setBills(groupBillsByMonth(res.result.data));
    } else {
      setBills(undefined);
    }
  }

  // fetch list bills again when this screen is focused
  useOnFocused(navigation, () => fetchBills());

  useStatusBar('dark-content');

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.householdInfo}>
          <Text style={styles.areaName}>{`${areaName}\n${locationCode}`}</Text>
        </View>
        {bills &&
          billMonths.map(billOfMonth => (
            <BillsOfMonthAccordion
              expanded={billMonths.length === 1 ? true : undefined}
              key={billOfMonth}
              month={billOfMonth}
              bills={bills[billOfMonth]}
              onMonthPress={onMonthPress}
              onCheckedBill={onCheckedBill}
              selectedBillIds={selectedBills}
            />
          ))}
      </ScrollView>

      <View style={styles.line} />
      <View style={styles.row}>
        <Text style={styles.totalAmount}>
          {i18n.t('features.ecoId.ecoIdPreparePaymentScreen.totalAmount')}
        </Text>
        <Text bold="bold" style={styles.priceText}>
          {i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
            price: getNumberString(getTotalPrice(selectedBills)),
          })}
        </Text>
      </View>

      <Button
        style={styles.button}
        type="primary"
        title={i18n.t(
          'features.ecoId.ecoIdPreparePaymentScreen.proceedToPayment',
        )}
        uppercase={false}
        disable={!Object.values(selectedBills).find(bill => !!bill)}
        onPress={onPaymentPress}
        loading={loading}
      />
      {!bills && (
        <Loader
          style={styles.loading}
          color={applicationColors.semantic.info.shade500}
        />
      )}
    </View>
  );
}

function getTotalPrice(selectedBills: SelectedBillType): number {
  let total = 0;
  if (selectedBills) {
    Object.values(selectedBills).forEach(bill => {
      if (bill && bill.debtAmount) {
        total += bill.debtAmount;
      }
    });
  }
  return total;
}

function getMonthsOfBills(selectedBills: SelectedBillType): string[] {
  const months: string[] = [];
  Object.values(selectedBills).forEach(bill => {
    if (bill && !months.includes(bill.billOfMonth)) {
      months.push(bill.billOfMonth);
    }
  });
  return months;
}
