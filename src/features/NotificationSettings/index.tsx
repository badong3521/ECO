import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Text from '../../components/Text';
import styles from './style.css';
import ToggleNotificationItem from './components/ToggleNotificationItem';
import UserApi from '../../services/api/user';
import { useUserState } from '../User/reducers';
import {
  EcoidResidencesType,
  HouseNotificationTypes,
  NotificationSettingsType,
} from '../../services/api/types/user';
import Firebase from '../../services/firebase';

const userApi = new UserApi();

// Settings for receive notification screens
export default function NotificationSettings() {
  const i18n = useTranslation();
  const [userState] = useUserState();
  const [error, setError] = useState<any>();

  const houses: string[] | undefined = sortHouses(
    userState.notificationSettings?.ecoidResidences,
  );

  function onBillNotificationChanged(
    enable: boolean,
    notificationType: HouseNotificationTypes,
    locationCode: string,
  ) {
    Firebase.track(
      enable ? 'enable_bills_notification' : 'disable_bills_notification',
    );
    onUpdateNotificationSettings({
      ecoparkNewsNotification:
        userState.notificationSettings?.ecoparkNewsNotification,
      ecoidResidences: {
        [locationCode]: {
          [notificationType]: enable,
        },
      },
    });
  }

  function onNewsNotificationChanged(
    ecoParkEnable?: boolean,
    ecopmEnable?: boolean,
  ) {
    Firebase.track(
      ecoParkEnable
        ? 'enable_ecopark_notification'
        : 'disable_ecopark_notification',
    );
    Firebase.track(
      ecopmEnable ? 'enable_ecopm_notification' : 'disable_ecopm_notification',
    );
    onUpdateNotificationSettings({
      ecoparkNewsNotification: ecoParkEnable,
      ecopmNewsNotification: ecopmEnable,
      ecoidResidences: userState.notificationSettings?.ecoidResidences,
    });
  }

  async function onUpdateNotificationSettings(
    params: NotificationSettingsType,
  ) {
    setError(undefined);
    const res = await userApi.updateNotificationSettings(params);
    if (res.status !== 'success') {
      setError(res.errors);
      Alert.alert('', i18n.t(error || 'errors.unknown'));
    }
  }

  return (
    <View style={styles.root}>
      {houses && (
        <>
          <Text style={styles.section} bold="bold">
            {i18n.t(
              'features.settingsScreen.notificationsSettings.billNotifications',
            )}
          </Text>
          {houses.map(key => (
            <ToggleNotificationItem
              key={key}
              label={key}
              enable={
                userState.notificationSettings?.ecoidResidences![key]
                  .paymentReminderNotification
              }
              onValueChange={value =>
                onBillNotificationChanged(
                  value,
                  'paymentReminderNotification',
                  key,
                )
              }
              errors={error}
            />
          ))}
        </>
      )}
      <View>
        <Text style={styles.section} bold="bold">
          {i18n.t(
            'features.settingsScreen.notificationsSettings.newsNotifications',
          )}
        </Text>
        <ToggleNotificationItem
          label={i18n.t(
            'features.settingsScreen.notificationsSettings.newsNotificationsOfEcopark',
          )}
          enable={userState.notificationSettings?.ecoparkNewsNotification}
          onValueChange={value =>
            onNewsNotificationChanged(
              value,
              userState.notificationSettings?.ecopmNewsNotification,
            )
          }
          errors={error}
        />
        <ToggleNotificationItem
          label={i18n.t(
            'features.settingsScreen.notificationsSettings.newsNotificationsOfEcoPM',
          )}
          enable={userState.notificationSettings?.ecopmNewsNotification}
          onValueChange={value =>
            onNewsNotificationChanged(
              userState.notificationSettings?.ecoparkNewsNotification,
              value,
            )
          }
          errors={error}
        />
      </View>
    </View>
  );
}

// sort houses by name ascending
function sortHouses(
  ecoidResidences?: EcoidResidencesType,
): string[] | undefined {
  if (ecoidResidences) {
    const keys = Object.keys(ecoidResidences);
    if (keys.length > 0) {
      return Object.keys(ecoidResidences).sort((a, b) => (a > b ? 1 : -1));
    }
  }
  return undefined;
}
