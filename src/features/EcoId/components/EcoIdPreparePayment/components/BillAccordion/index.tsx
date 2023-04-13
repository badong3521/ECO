import React from 'react';
import { View } from 'react-native';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import Accordion from '../../../../../../components/Accordion';
import { BillType } from '../../../../../../services/api/types/ecoid';
import styles from './style.css';
import { applicationColors } from '../../../../../../../style.css';
import CheckBox from '../../../../../../components/CheckBox';
import BillTitle from './components/BillTitle';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import BillDetailRow, {
  BillDetailRowProps,
} from '../../../EcoIdPaymentHistory/components/PaidBillAccordion/components/BillDetailRow';
import BillDetailItem from '../BillDetailItem';
import { getNumberString } from '../../../../../../utils/number';

interface BillAccordionProps {
  bill: BillType;
  onCheckedBill: (checked: boolean, bill: BillType) => void;
  checked: boolean;
}

// Show all details of a bill
export default function BillAccordion(props: BillAccordionProps) {
  const { bill, onCheckedBill, checked } = props;
  const i18n = useTranslation();
  const details = getBillDetailRows(i18n, bill);

  return (
    <View style={styles.row}>
      {(details && details.length > 0) || bill.allocatedAmount > 0 ? (
        <Accordion
          style={styles.accordion}
          title=""
          left={() => <BillTitle bill={bill} i18n={i18n} />}
        >
          <View style={styles.container}>
            {details.map(row => (
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
              content={`-${i18n.t(
                'features.ecoId.ecoIdPreparePaymentScreen.vnd',
                {
                  price: getNumberString(bill.allocatedAmount),
                },
              )}`}
              color="black"
            />
            <View style={styles.line} />
            <BillDetailItem
              style={styles.totalItem}
              title={i18n.t(
                'features.ecoId.ecoIdPreparePaymentScreen.billTotal',
              )}
              content={i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
                price: getNumberString(bill.amount - bill.allocatedAmount),
              })}
              bold="bold"
              color="black"
            />
            <View style={styles.shadow} />
          </View>
        </Accordion>
      ) : (
        <TouchableComponent
          onPress={() => {
            onCheckedBill(!checked, bill);
          }}
        >
          <View style={styles.noAccordion}>
            <BillTitle bill={bill} i18n={i18n} />
          </View>
        </TouchableComponent>
      )}
      <View style={styles.checkboxContainer}>
        <CheckBox
          containerStyleIOS={styles.checkbox}
          containerStyleAndroid={styles.checkbox}
          onValueChange={value => onCheckedBill(value, bill)}
          color={applicationColors.semantic.info.shade500}
          value={checked}
        />
      </View>
    </View>
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
    title: 'billDueDate',
    value: bill.issueDate || bill.expiryDate,
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
