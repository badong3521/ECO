import { View, ViewStyle } from 'react-native';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import styles from '../../style.css';
import Text from '../../../../../../../../components/Text';
import { getNumberString } from '../../../../../../../../utils/number';
import { BillType } from '../../../../../../../../services/api/types/ecoid';

interface AccordionTitleProps {
  bill: BillType;
  i18n: UseTranslationResponse;
  style?: ViewStyle;
}
export default function BillTitle(props: AccordionTitleProps) {
  const { bill, i18n, style } = props;

  return (
    <View style={[styles.billRow, style]}>
      <Text style={styles.matchText} fontSize="small" numberOfLines={1}>
        {`${i18n.t(
          `features.ecoId.ecoIdPreparePaymentScreen.billTypes.${bill?.billType}`,
        )}${getSubtitle(bill)}`}
      </Text>
      <Text bold="bold" fontSize="small" style={styles.billPriceText}>
        {i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
          price: getNumberString(bill?.debtAmount || bill.amount),
        })}
      </Text>
    </View>
  );
}

function getSubtitle(bill: BillType): string {
  if (bill.billType === 'XE') {
    return ` (${bill.details[0]?.vehicleRegistrationNumber || ''})`;
  }

  if (bill.billType === 'DIEN') {
    return ` (${bill.quantity}kwh)`;
  }
  if (bill.billType === 'NUOC') {
    return ` (${bill.quantity}m3)`;
  }
  return '';
}
