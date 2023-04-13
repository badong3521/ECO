import React, { useEffect } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useUserState } from '../User/reducers';
import Text from '../../components/Text';
import IconComponent from '../../components/Icon';
import styles from './style.css';
import TouchableComponent from '../../components/TouchableComponent';
import navigationService from '../../services/navigationService';
import UserApi from '../../services/api/user';

const Image = require('../../assets/images/home_directory_onboarding.png');

export default function HomeDirectoryOnboardingScreen() {
  const i18n = useTranslation();
  const [userState] = useUserState();
  const { user } = userState;
  const userApi = new UserApi();

  useEffect(() => {
    return () => {
      userApi.updateUserProfile({
        userId: user?.id!,
        reachedAppOnboardingScreen: true,
      });
    };
  }, []);

  return (
    <>
      <View style={styles.background}>
        <LinearGradient
          colors={['#B7EEE3', '#11B997']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <LinearGradient
          colors={['white', 'white']}
          start={{ x: 0, y: 0.17 }}
          end={{ x: 0, y: 0.73 }}
          angle={41}
          style={styles.circle1}
        />
        <LinearGradient
          colors={['white', 'white']}
          start={{ x: 0, y: 0.17 }}
          end={{ x: 0, y: 0.73 }}
          angle={41}
          style={styles.circle2}
        />
      </View>
      <View style={styles.content}>
        <FastImage source={Image} style={styles.image} />
        <Text fontSize="large" bold="bold" style={styles.title}>
          {`${i18n.t('features.onboarding.title')} ${user?.firstName}!`}
        </Text>
        <Text style={styles.text}>{i18n.t('features.onboarding.text')}</Text>
      </View>
      <TouchableComponent
        onPress={() => {
          navigationService.back();
        }}
      >
        <View style={styles.buttonContainer}>
          <Text bold="bold" style={styles.buttonLabel}>
            {i18n.t('features.onboarding.buttonLabel')}
          </Text>
          <IconComponent size={12} name="chevron-right" iconPack="feather" />
          <IconComponent
            size={12}
            name="chevron-right"
            iconPack="feather"
            style={{ marginLeft: -6 }}
          />
        </View>
      </TouchableComponent>
    </>
  );
}
