import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../components/Text';
import Avatar from '../../../../components/Avatar';
import { UserType } from '../../../User/types';
import { getUserFullNameByLocale, LanguageType } from '../../../User/reducers';
import TouchableComponent from '../../../../components/TouchableComponent';
import IconComponent from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';
import IconButtonWithCounter from '../../../../components/IconButtonWithCounter';

interface UserInfoProps {
  user?: UserType;
  userLanguage?: LanguageType;
  onUserInfoPress: () => void;
  onNotificationPress: () => void;
  notificationCount?: number;
}

// Containing the user's info
// will be shown in UserDashboard
export default function UserInfo(props: UserInfoProps) {
  const {
    user,
    userLanguage,
    onUserInfoPress,
    onNotificationPress,
    notificationCount,
  } = props;
  const i18n = useTranslation();
  return (
    <TouchableComponent onPress={onUserInfoPress}>
      <View style={styles.userContainer}>
        <View style={styles.avatar}>
          <Avatar size={57} avatarUrl={user?.avatar} />
        </View>

        <View style={styles.contentContainer}>
          <Text bold="bold" style={styles.name} numberOfLines={2}>
            {getUserFullNameByLocale(
              userLanguage,
              user?.firstName,
              user?.lastName,
            )}
          </Text>
          <View style={styles.row}>
            <Text style={styles.profile} fontSize="small">
              {i18n.t('features.userScreen.profile')}
            </Text>
            <IconComponent
              size={applicationDimensions.iconSizeSmall}
              name={applicationIcons.arrowRight}
              color={applicationColors.neutral.shade500}
              style={styles.arrowRight}
              iconPack="feather"
            />
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <IconButtonWithCounter
            onPress={onNotificationPress}
            count={notificationCount}
            borderWidth={3}
            iconComponent={
              <View style={styles.notification}>
                <IconComponent
                  name="bell"
                  iconPack="feather"
                  color={applicationColors.secondary.shade500}
                  size={20}
                />
              </View>
            }
          />
        </View>
      </View>
    </TouchableComponent>
  );
}
