import { Dimensions, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../../../../../components/Text';
import { ResidentType } from '../../../../../../services/api/types/ecoid';
import BillIcon from '../../../../../../assets/profile/ic_bill.svg';
import Button from '../../../../../../components/Button';
import styles from '../../style.css';
import { applicationDimensions } from '../../../../../../../style.css';

interface ResidenceCardProps {
  resident: ResidentType;
  index: number;
  fullWidth: boolean;
  onResidentPress: (resident: ResidentType) => void;
}

export const cardWidth = Dimensions.get('screen').width * 0.8;

export default function ResidenceCard(props: ResidenceCardProps) {
  const { resident, index, onResidentPress, fullWidth } = props;
  const i18n = useTranslation();

  const width = fullWidth
    ? Dimensions.get('screen').width - applicationDimensions.defaultPadding * 2
    : cardWidth;

  function onPress() {
    onResidentPress(resident);
  }
  return (
    <View
      style={[
        styles.cardContainer,
        {
          width,
          backgroundColor: BACKGROUND_COLORS[index % 2],
          shadowColor: BACKGROUND_COLORS[index % 2],
          borderColor: BORDER_COLORS[index % 2],
        },
      ]}
    >
      <Text fontSize="large" bold="bold" style={styles.locationCode}>
        {resident.locationCode ?? ''}
      </Text>
      <Text bold="bold" fontSize="tiny" style={styles.address}>
        {resident.address ?? ''}
      </Text>
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.billIcon}>
          <BillIcon />
        </View>
        <Text fontSize="tiny" bold="bold" style={styles.totalBill}>
          {resident.totalUnpaidBill > 0
            ? i18n.t(
                `features.userScreen.residences.${
                  resident.totalUnpaidBill > 1
                    ? 'totalUnpaidBills'
                    : 'totalUnpaidBill'
                }`,
                {
                  total: resident.totalUnpaidBill,
                },
              )
            : i18n.t('features.userScreen.residences.noUnpaidBill')}
        </Text>
      </View>
      <Button
        style={styles.button}
        uppercase={false}
        labelStyle={styles.buttonLabel}
        type="secondary"
        title={i18n.t('features.userScreen.residences.manageHousehold')}
        onPress={onPress}
      />
    </View>
  );
}

const BACKGROUND_COLORS = ['rgba(3, 129, 246,1)', 'rgba(246, 119, 3,1)'];
const BORDER_COLORS = ['rgb(89,169,243)', 'rgb(250,176,109)'];
