import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../components/Text';
import LanguageToggle from '../../components/LanguageToggle';
import IconComponent from '../../components/Icon';
import { applicationColors } from '../../../style.css';
import TouchableComponent from '../../components/TouchableComponent';
import DialogManager from '../../components/Dialog/manager';

import UserApi from '../../services/api/user';
import { useUserState } from '../User/reducers';
import EcoIdApi from '../../services/api/ecoId';
import Firebase from '../../services/firebase';
import Accordion from '../../components/Accordion';
import NotificationSettings from '../NotificationSettings';

type SettingTypes =
  | 'language'
  | 'notifications'
  | 'resync_notification'
  | 'changePassword'
  | 'signOut';

interface SettingsScreenProps {
  navigation: any;
}

const userApi = new UserApi();
const ecoIdApi = new EcoIdApi();
export default function SettingsScreen(props: SettingsScreenProps) {
  const { navigation } = props;
  const { t } = useTranslation();
  const [userState] = useUserState();

  async function fetchResidences() {
    DialogManager.showLoadingDialog({
      dismissible: true,
    });
    const res = await ecoIdApi.fetchEcoIdResidents();
    const syncedResidences = await ecoIdApi.fetchResidences();
    DialogManager.dismissLoadingDialog();
    if (res.status === 'success') {
      navigation.navigate('EcoIdSelectResidentScreen', {
        residents: res.result.data,
        syncedResidences:
          syncedResidences.status === 'success'
            ? syncedResidences.result.data
            : undefined,
      });
    } else {
      navigation.goBack();
      navigation.navigate('EcoIdFailedScreen', {
        title: 'features.ecoId.ecoIdSelectResidentScreen.failed.header',
        message: 'features.ecoId.ecoIdSelectResidentScreen.failed.body',
        button: 'features.ecoId.ecoIdSelectResidentScreen.failed.contactUs',
      });
    }
  }

  function onSettingOptionPress(setting: SettingTypes) {
    switch (setting) {
      case 'resync_notification':
        Firebase.track('resync_ecoid_from_settings');
        fetchResidences();
        break;
      case 'signOut':
        onSignOutPress();
        break;
      case 'changePassword':
        navigation.navigate('ChangePasswordScreen');
        break;
      default:
        break;
    }
  }

  async function onConfirmLogoutPress() {
    await userApi.revokeToken(userState.userToken!.accessToken);
    navigation.navigate('Auth');
  }

  function onSignOutPress() {
    DialogManager.showConfirmDialog({
      title: t('features.userScreen.popupLogoutTitle'),
      confirmTitle: t('features.userScreen.logout'),
      confirmColor: applicationColors.semantic.error.shade500,
      onConfirmPress: onConfirmLogoutPress,
    });
  }

  function renderSettingOption(setting: SettingTypes) {
    switch (setting) {
      case 'language':
        return (
          <View style={styles.row} key="language">
            <Text style={styles.label}>
              {t('features.settingsScreen.language')}
            </Text>
            <LanguageToggle />
          </View>
        );
      case 'notifications':
        return (
          <Accordion
            title={
              <Text style={styles.label}>
                {t(`features.settingsScreen.${setting}`)}
              </Text>
            }
          >
            <NotificationSettings />
          </Accordion>
        );
      default:
        return (
          <TouchableComponent
            onPress={() => onSettingOptionPress(setting)}
            key={setting}
          >
            <View style={styles.row}>
              <Text style={styles.label}>
                {t(`features.settingsScreen.${setting}`)}
              </Text>
              <IconComponent
                size={25}
                name="chevron-right"
                color={applicationColors.neutral.shade900}
              />
            </View>
          </TouchableComponent>
        );
    }
  }
  useEffect(() => {
    userApi.fetchNotificationSettings();
  }, []);
  return (
    <FlatList
      style={styles.root}
      data={getSettingsOptions(
        userState.user?.syncedEcoid,
        !userState.user?.provider,
      )}
      renderItem={({ item }) => renderSettingOption(item)}
    />
  );
}

function getSettingsOptions(
  syncedEcoId?: boolean,
  hasPassword?: boolean,
): SettingTypes[] {
  const settings: SettingTypes[] = ['language', 'notifications'];
  if (syncedEcoId) {
    settings.push('resync_notification');
  }
  if (hasPassword) {
    settings.push('changePassword');
  }
  settings.push('signOut');
  return settings;
}
