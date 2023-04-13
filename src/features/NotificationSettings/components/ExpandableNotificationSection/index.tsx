import React from 'react';
import { LayoutAnimation, View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import ToggleNotificationItem from '../ToggleNotificationItem';
import {
  HouseNotificationTypes,
  PaymentNotificationSettingsType,
} from '../../../../services/api/types/user';
import Accordion from '../../../../components/Accordion';
import styles from '../../style.css';

interface ExpandableNotificationSectionProps {
  i18n: UseTranslationResponse;
  locationCode: string;
  paymentNotificationSettings?: PaymentNotificationSettingsType;
  onEnableChanged: (
    enable: boolean,
    notificationType: HouseNotificationTypes,
  ) => void;
  errors?: any;
}

// Notification Settings for each house
export default function ExpandableNotificationSection(
  props: ExpandableNotificationSectionProps,
) {
  const {
    locationCode,
    i18n,
    paymentNotificationSettings,
    onEnableChanged,
    errors,
  } = props;

  function onPress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  return (
    <Accordion
      title={locationCode}
      onPress={onPress}
      style={styles.accordion}
      titleStyle={styles.accordionTitle}
    >
      <View style={styles.accordionContainer}>
        {paymentNotificationSettings &&
          BillNotificationSettings.map(setting => {
            return (
              <ToggleNotificationItem
                label={i18n.t(
                  `features.settingsScreen.notificationsSettings.${setting}`,
                )}
                enable={paymentNotificationSettings[setting]}
                onValueChange={checked => onEnableChanged(checked, setting)}
                errors={errors}
              />
            );
          })}
        <View style={styles.shadow} />
      </View>
    </Accordion>
  );
}

const BillNotificationSettings: HouseNotificationTypes[] = [
  'paymentReminderNotification',
];
