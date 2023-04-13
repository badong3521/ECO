import React from 'react';
import { View } from 'react-native';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import Accordion from '../../../../../../components/Accordion';
import { BillType } from '../../../../../../services/api/types/ecoid';
import styles from './style.css';
import BillDetailRow, { BillDetailRowProps } from './components/BillDetailRow';
import BillTitle from '../../../EcoIdPreparePayment/components/BillAccordion/components/BillTitle';
import BillDetailItem from '../../../EcoIdPreparePayment/components/BillDetailItem';
import { getNumberString } from '../../../../../../utils/number';

interface PaidBillAccordionProps {
  bill: BillType;
}

// Show all details of a paid bill, inside a month
export default function PaidBillAccordion(props: PaidBillAccordionProps) {
  const { bill } = props;
  const i18n = useTranslation();

  return (
    <Accordion
      style={styles.accordion}
      title=""
      left={() => (
        <BillTitle bill={bill} i18n={i18n} style={styles.billTitle} />
      )}
    >
      <View style={styles.container}>
        {getBillDetailRows(i18n, bill).map(row => (
          <BillDetailRow
            key={row.title}
            title={i18n.t(
              `features.ecoId.ecoIdPaymentHistoryScreen.billDetails.${row.title}`,
            )}
            value={row.value}
            details={row.details}
            lastRow={row.lastRow}
          />
        ))}
        <View style={styles.lineTop} />
        <BillDetailItem
          style={styles.totalItem}
          title={i18n.t('features.ecoId.ecoIdPreparePaymentScreen.total')}
          content={i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
            price: getNumberString(bill.amount),
          })}
          color="black"
        />
        <BillDetailItem
          style={styles.totalItem}
          title={i18n.t(
            'features.ecoId.ecoIdPaymentHistoryScreen.billDetails.prepaidAmount',
          )}
          content={`-${i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
            price: getNumberString(bill.allocatedAmount),
          })}`}
          color="black"
        />
        <View style={styles.line} />
        <BillDetailItem
          style={styles.totalItem}
          title={i18n.t('features.ecoId.ecoIdPreparePaymentScreen.billTotal')}
          content={i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
            price: getNumberString(bill.amount - bill.allocatedAmount),
          })}
          bold="bold"
          color="black"
        />
        <View style={styles.shadow} />
      </View>
    </Accordion>
  );
}

// get all attributes will be shown for bill details
function getBillDetailRows(
  i18n: UseTranslationResponse,
  bill: BillType,
): BillDetailRowProps[] {
  const rows: BillDetailRowProps[] = [];
  const details =
    bill.details && bill.details.length > 0 && bill.billType !== 'XE'
      ? bill.details
      : undefined;
  rows.push({
    title: 'billNumber',
    value: bill.billId.toString(),
  });
  rows.push({
    title: 'billDescription',
    value: bill.description,
  });
  rows.push({
    title: 'billIssueDate',
    value: bill.issueDate,
  });
  rows.push({
    title: 'billFinalPaymentDate',
    value: bill.finalPaymentDate,
    lastRow: !details,
  });
  if (details) {
    rows.push({
      title: 'billDetails',
      details,
      lastRow: true,
    });
  }
  return rows;
}
