import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Accordion from '../../../../../../components/Accordion';
import { BillType } from '../../../../../../services/api/types/ecoid';
import styles from './style.css';
import Text from '../../../../../../components/Text';
import { getNumberString } from '../../../../../../utils/number';
import { getDateMMYYYY } from '../../../../../../utils/date';
import PaidBillAccordion from '../PaidBillAccordion';

interface PaidBillsOfMonthAccordionProps {
  month: string;
  bills: BillType[];
  expanded: boolean;
}

// Display all paid bills of a month
export default function PaidBillsOfMonthAccordion(
  props: PaidBillsOfMonthAccordionProps,
) {
  const { month, bills, expanded } = props;
  const i18n = useTranslation();

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
          <PaidBillAccordion key={bill.billId} bill={bill} />
        ))}
      </Accordion>
    </View>
  ) : (
    <View />
  );
}

function getTotalPrices(bills: BillType[]): number {
  let totalPrices = 0;
  bills.forEach(bill => {
    totalPrices += bill.amount;
  });
  return totalPrices;
}
