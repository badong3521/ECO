import React, { useEffect, useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { View } from 'react-native';
import Onboarding from '../../../Authentication/components/SignUpScreen/components/Onboarding';
import Onboarding1 from '../../../../assets/onboarding/onboarding_1.svg';
import Onboarding2 from '../../../../assets/onboarding/onboarding_2.svg';
import Onboarding3 from '../../../../assets/onboarding/onboarding_3.svg';
import Button from '../../../../components/Button';
import EcoIdOnboardingItem from './components/EcoIdOnboardingItem';
import Background from '../../../../assets/ecoid/svg/onboardingBackground.svg';
import styles from './style.css';
import EcoIdApi from '../../../../services/api/ecoId';
import Loader from '../../../../components/Loader';
import { applicationColors } from '../../../../../style.css';
import Firebase from '../../../../services/firebase';

interface EcoIdOnboardingScreenProps {
  navigation: any;
}

const ecoIdApi = new EcoIdApi();

export default function EcoIdOnboardingScreen(
  props: EcoIdOnboardingScreenProps,
) {
  const { navigation } = props;
  const i18n = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>();

  async function onStartSyncOnPress() {
    setLoading(true);
    const res = await ecoIdApi.fetchEcoIdResidents();
    setLoading(false);
    if (res.status === 'success') {
      Firebase.track('sync_ecoid_successful');
      navigation.navigate('EcoIdSelectResidentScreen', {
        residents: res.result.data,
        redirectAfterSuccess: navigation.getParam('redirectAfterSuccess'),
        successCallback: navigation.getParam('successCallback'),
      });
    } else {
      Firebase.track('sync_ecoid_failed');
      navigation.goBack();
      navigation.navigate('EcoIdFailedScreen', {
        title: 'features.ecoId.ecoIdSelectResidentScreen.failed.header',
        message: 'features.ecoId.ecoIdSelectResidentScreen.failed.body',
        button: 'features.ecoId.ecoIdSelectResidentScreen.failed.contactUs',
      });
    }
  }

  useEffect(() => {
    setList(ECOID_ONBOARDING_ITEMS(i18n, onStartSyncOnPress, loading));
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Background
          preserveAspectRatio="xMidYMid meet"
          height="100%"
          width="100%"
        />
      </View>
      <View style={styles.content}>
        {list ? (
          <Onboarding
            renderItem={EcoIdOnboardingItem}
            data={list}
            paginationContainerStyle={styles.pagination}
          />
        ) : (
          <View style={styles.loader}>
            <Loader color={applicationColors.semantic.info.shade500} />
          </View>
        )}
      </View>
    </View>
  );
}

const ECOID_ONBOARDING_ITEMS = (
  i18n: UseTranslationResponse,
  onStartSyncPress: () => void,
  loading?: boolean,
) => [
  {
    text: i18n.t('features.ecoId.ecoIdOnboardingScreen.screen1.text'),
    image: (
      <Onboarding1
        preserveAspectRatio="xMidYMid meet"
        height="100%"
        width="80%"
      />
    ),
    title: i18n.t('features.ecoId.ecoIdOnboardingScreen.screen1.title'),
  },
  {
    text: i18n.t('features.ecoId.ecoIdOnboardingScreen.screen2.text'),
    image: (
      <Onboarding2
        preserveAspectRatio="xMidYMid meet"
        height="100%"
        width="80%"
      />
    ),
    title: i18n.t('features.ecoId.ecoIdOnboardingScreen.screen2.title'),
  },
  {
    text: i18n.t('features.ecoId.ecoIdOnboardingScreen.screen3.text'),
    image: (
      <Onboarding3
        preserveAspectRatio="xMidYMid meet"
        height="100%"
        width="100%"
      />
    ),
    title: i18n.t('features.ecoId.ecoIdOnboardingScreen.screen3.title'),
    button: (
      <Button
        uppercase={false}
        type="primary"
        title={i18n.t('features.ecoId.ecoIdOnboardingScreen.screen3.button')}
        onPress={onStartSyncPress}
        style={styles.buttonContainer}
        loading={loading}
      />
    ),
  },
];
