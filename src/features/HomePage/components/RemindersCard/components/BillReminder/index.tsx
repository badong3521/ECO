import React from 'react';
import { Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import styles from '../../style.css';
import Text from '../../../../../../components/Text';
import IconComponent from '../../../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../../../style.css';
import {
  ReminderElectricBillType,
  ReminderNewBillType,
} from '../../../../../../services/api/types/reminder';
import TouchableComponent from '../../../../../../components/TouchableComponent';
import { goToPaymentScreen } from '../../../../../../utils/ecoId';
import Firebase from '../../../../../../services/firebase';
import navigationService from '../../../../../../services/navigationService';

const BILL_ICON = require('../../../../../../assets/home/bill_reminder.png');

interface BillReminderProps {
  newBillReminder?: ReminderNewBillType;
  electricBill?: ReminderElectricBillType;
}
export default function BillReminder(props: BillReminderProps) {
  const { newBillReminder, electricBill } = props;
  const i18n = useTranslation();

  async function onPress() {
    if (newBillReminder) {
      Firebase.track('pay_bills_from_home');
      goToPaymentScreen(newBillReminder.residentIds);
    } else if (electricBill) {
      navigationService.navigate('DncElectricBillScreen');
    } else {
      Firebase.track('go_ecoId_dashboard_from_home');
      navigationService.navigate('EcoIdOnboardingScreen');
    }
  }

  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.billContainer}>
        <FastImage style={styles.billIcon} source={BILL_ICON} />
        <View style={styles.billContent}>
          <Text style={styles.text}>
            {newBillReminder &&
              i18n.t(
                `features.home.newBill.${
                  newBillReminder.totalBill > 1
                    ? 'messageMultipleBill'
                    : 'message'
                }`,
                {
                  total: newBillReminder.totalBill,
                },
              )}

            {electricBill &&
              i18n.t(
                `features.home.newElectricBill.${
                  electricBill.totalBill > 1 ? 'messageMultipleBill' : 'message'
                }`,
                {
                  total: electricBill.totalBill,
                },
              )}

            {!newBillReminder &&
              !electricBill &&
              i18n.t('features.home.ecoidOnboarding.message')}
          </Text>
          <View style={styles.payNow}>
            <Text style={styles.text} bold="bold">
              {newBillReminder || electricBill
                ? i18n.t('features.home.newBill.payNow')
                : i18n.t('features.home.ecoidOnboarding.tryNow')}
            </Text>
            <IconComponent
              size={
                applicationDimensions.iconSizeSmall *
                Dimensions.get('screen').fontScale
              }
              name={applicationIcons.arrowRight}
              color={applicationColors.primary.white}
              style={styles.arrow}
            />
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
}
