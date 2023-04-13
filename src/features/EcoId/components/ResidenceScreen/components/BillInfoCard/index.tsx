import { View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../../../components/Text';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';
import Heading from '../../../../../../components/Heading';
import { getNumberString } from '../../../../../../utils/number';
import { getDateDDMMYYYY } from '../../../../../../utils/date';
import Button from '../../../../../../components/Button';
import { LanguageType } from '../../../../../User/reducers';

interface PropTypes {
  totalBill: number;
  nextBill?: Date;
  userLanguage: LanguageType;
  onPaymentHistoryPress: () => void;
  onPaymentPress: () => void;
}

export default function BillInfoCard(props: PropTypes) {
  const {
    totalBill,
    nextBill,
    userLanguage,
    onPaymentPress,
    onPaymentHistoryPress,
  } = props;
  const { i18n } = useTranslation();

  return (
    <View style={styles.infoCard}>
      <Text style={{ marginBottom: applicationDimensions.smallPadding }}>
        {i18n.t('features.ecoId.ecoIdHouseholdScreen.yourBills')}
      </Text>
      <View style={styles.totalAmountContainer}>
        <View style={styles.spacer} />
        <Heading bold="bold" style={styles.totalAmount}>
          {getNumberString(totalBill, userLanguage)}
        </Heading>
        <View style={styles.spacer}>
          <Text
            bold="bold"
            style={{ color: applicationColors.semantic.info.shade500 }}
          >
            VNĐ
          </Text>
        </View>
      </View>
      {nextBill && (
        <Text
          style={{
            marginBottom: applicationDimensions.smallPadding,
            color:
              nextBill <= new Date()
                ? applicationColors.semantic.error.shade500
                : applicationColors.primary.black,
          }}
        >
          {`${i18n.t(
            'features.ecoId.ecoIdHouseholdScreen.nextDueDate',
          )}: ${getDateDDMMYYYY(nextBill)}`}
        </Text>
      )}
      <View style={styles.row}>
        <View style={styles.leftButtonContainer}>
          <Button
            onPress={onPaymentHistoryPress}
            type="secondary"
            title={i18n.t('features.ecoId.ecoIdHouseholdScreen.paymentHistory')}
            uppercase={false}
            style={styles.historyButton}
            labelStyle={{ color: applicationColors.semantic.info.shade500 }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={onPaymentPress}
            type="primary"
            title={i18n.t('features.ecoId.ecoIdHouseholdScreen.payBills')}
            uppercase={false}
            style={styles.payButton}
            color={applicationColors.semantic.info.shade500}
            disable={!nextBill}
          />
        </View>
      </View>
    </View>
  );
}
