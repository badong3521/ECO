import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../../../../../components/Text';
import DashedLine from '../../../../../../../../components/DashedLine';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';
import { UtilityBillDetailType } from '../../../../../../../../services/api/types/ecoid';
import { getNumberString } from '../../../../../../../../utils/number';
import BillDetailItem from '../../../../../EcoIdPreparePayment/components/BillDetailItem';

export interface BillDetailRowProps {
  title: string;
  value?: string;
  details?: UtilityBillDetailType[];
  lastRow?: boolean;
}

// Containing title, description or list details of a bill attribute
export default function BillDetailRow(props: BillDetailRowProps) {
  const { title, value, details, lastRow } = props;
  const i18n = useTranslation();

  function renderDetailRow(utility: UtilityBillDetailType): React.ReactNode {
    return (
      <BillDetailItem
        key={utility.description}
        style={styles.detailItem}
        title={utility.description}
        content={i18n.t('features.ecoId.ecoIdPreparePaymentScreen.vnd', {
          price: getNumberString(utility.amount || 0),
        })}
        color="black"
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text fontSize="small" style={styles.title}>
        {title}
      </Text>
      {value && (
        <Text
          fontSize="small"
          style={[
            styles.value,
            {
              marginBottom: details ? applicationDimensions.smallPadding : 0,
            },
          ]}
        >
          {value}
        </Text>
      )}
      {details && (
        <View style={styles.detailsContainer}>
          {details.map(utility => renderDetailRow(utility))}
        </View>
      )}
      {!lastRow && (
        <DashedLine
          style={styles.dash}
          color={applicationColors.neutral.shade900}
          backgroundColor={applicationColors.secondary.background}
          type="top"
        />
      )}
    </View>
  );
}
