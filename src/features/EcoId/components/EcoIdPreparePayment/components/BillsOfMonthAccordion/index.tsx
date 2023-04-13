import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Accordion from '../../../../../../components/Accordion';
import {
  BillType,
  SelectedBillType,
} from '../../../../../../services/api/types/ecoid';
import BillAccordion from '../BillAccordion';
import styles from './style.css';
import Text from '../../../../../../components/Text';
import { getNumberString } from '../../../../../../utils/number';
import { applicationColors } from '../../../../../../../style.css';
import CheckBox from '../../../../../../components/CheckBox';
import { getDateMMYYYY } from '../../../../../../utils/date';

interface BillsOfMonthAccordionProps {
  month: string;
  bills: BillType[];
  onMonthPress: (month: string, checked: boolean) => void;
  onCheckedBill: (checked: boolean, bill: BillType) => void;
  selectedBillIds: SelectedBillType;
  expanded?: boolean;
}

// Display all bills of a month
export default function BillsOfMonthAccordion(
  props: BillsOfMonthAccordionProps,
) {
  const {
    month,
    bills,
    onMonthPress,
    onCheckedBill,
    selectedBillIds,
    expanded,
  } = props;
  const i18n = useTranslation();
  const uncheckedBills = bills.find(bill => !selectedBillIds[bill.billId]);

  function renderTitle(): React.ReactNode {
    return (
      <View style={styles.monthBillRow}>
        <Text bold="bold" style={styles.matchText}>
          {getDateMMYYYY(month) || ''}
        </Text>
        <Text bold="bold" style={styles.priceText}>
          {i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
            price: getNumberString(getTotalPrices(bills)),
          })}
        </Text>
      </View>
    );
  }

  return bills ? (
    <View style={styles.container}>
      <Accordion
        title=""
        style={styles.accordion}
        left={() => renderTitle()}
        expanded={expanded}
      >
        {bills.map(bill => (
          <BillAccordion
            key={bill.billId}
            bill={bill}
            onCheckedBill={onCheckedBill}
            checked={!!selectedBillIds[bill.billId]}
          />
        ))}
      </Accordion>
      <View style={styles.checkboxContainer}>
        <CheckBox
          containerStyleIOS={styles.checkbox}
          containerStyleAndroid={styles.checkbox}
          onValueChange={value => {
            onMonthPress(month, value);
          }}
          value={!uncheckedBills}
          color={applicationColors.semantic.info.shade500}
        />
      </View>
    </View>
  ) : (
    <View />
  );
}

function getTotalPrices(bills: BillType[]): number {
  let totalPrices = 0;
  bills.forEach(bill => {
    totalPrices += bill.debtAmount;
  });
  return totalPrices;
}
