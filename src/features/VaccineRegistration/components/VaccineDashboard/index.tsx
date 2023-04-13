import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import IconStepRegister from '../../../../assets/vaccine/ic_step_register.svg';
import IconManageRegister from '../../../../assets/vaccine/ic_manage_register.svg';
import IconAfterVaccin from '../../../../assets/vaccine/ic_after_vaccin.svg';
import IconFeedback from '../../../../assets/vaccine/ic_feedback.svg';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Loader from '../../../../components/Loader';
import VaccineRegistrationModal from '../UserSelectionModal';
import i18n from '../../../../i18n';
import NoResidentFound from '../NoResidentFound';
import SelectResident, { registedStatuses } from '../SelectResident';
import {
  ResidentType,
  VaccineSurveyStatsType,
} from '../../../../services/api/types/ecoid';
import { ItemMenuType } from '../../types';
import { useUserState } from '../../../User/reducers';
import EcoIdApi from '../../../../services/api/ecoId';
import RegistrationExpired from '../RegistrationExpired';

import styles from './styles.css';

type ItemDataType = {
  key: ItemMenuType;
  icon: any;
};

interface Props {
  navigation: any;
}

const MENU_ITEMS: ItemDataType[] = [
  {
    key: 'register',
    icon: <IconStepRegister />,
  },
  {
    key: 'management',
    icon: <IconManageRegister />,
  },
  {
    key: 'injection_update',
    icon: <IconAfterVaccin />,
  },
  {
    key: 'feedback',
    icon: <IconFeedback />,
  },
];

export default function VaccineDashboard(props: Props) {
  const { navigation } = props;
  const reloadAt = navigation.getParam('reloadAt');
  const [vaccineModalVisible, setVaccineModalVisible] = useState<boolean>(
    false,
  );
  const [
    registrationExpiredModalVisible,
    setRegistrationExpiredModalVisible,
  ] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [modalType, setModalType] = useState<ItemMenuType>();
  const [residents, setResidents] = useState<ResidentType[]>();
  const [vaccineSurveyStats, setVaccineSurveyStats] = useState<
    VaccineSurveyStatsType
  >();
  const [userState] = useUserState();
  const { user } = userState;
  const ecoIdApi = new EcoIdApi();

  const registedResident = residents?.filter(resident => {
    return registedStatuses.indexOf(resident.registrationStatusCode) >= 0;
  });
  const verifiedResident = residents?.filter(
    resident => resident.registrationStatusCode === 'VERIFIED',
  );

  function onModalClose() {
    setVaccineModalVisible(false);
    setModalType(undefined);
  }

  function navigateToForm(resident: ResidentType) {
    // eslint-disable-next-line default-case
    switch (modalType) {
      case 'register':
        navigation.navigate('VaccineRegistrationScreen', { resident });
        break;
      case 'injection_update':
        navigation.navigate('AfterInjectionUpdateScreen', { resident });
        break;
      case 'feedback':
        navigation.navigate('HealthFeedback', { resident });
        break;
    }

    setVaccineModalVisible(false);
  }

  function renderItemTitle(key: ItemMenuType) {
    return i18n.t(`features.vaccineDashboard.title.${key}`);
  }

  function renderModalTitle(key?: ItemMenuType) {
    return i18n.t(`features.vaccineDashboard.modelTitle.${key}`);
  }

  function renderItemDescription(key: ItemMenuType) {
    let total;

    switch (key) {
      case 'register':
        total = registedResident ? registedResident.length : 0;
        break;
      case 'management':
        total = verifiedResident ? verifiedResident.length : 0;
        break;
      case 'injection_update':
        total = vaccineSurveyStats?.surveyInjection.reduce((acc, stats) => {
          return acc + stats.total;
        }, 0);
        break;
      case 'feedback':
        total = vaccineSurveyStats?.surveyHealth.reduce((acc, stats) => {
          return acc + stats.total;
        }, 0);
        break;
      default:
        total = 0;
    }

    return i18n.t(`features.vaccineDashboard.desc.${key}`, { total });
  }

  function handleMenuItemClick(key: ItemMenuType) {
    switch (key) {
      case 'register':
        setVaccineModalVisible(true);
        setModalType('register');
        // setRegistrationExpiredModalVisible(true);
        break;
      case 'management':
        navigation.navigate('VaccineRegistrationList', { residents });
        break;
      case 'injection_update':
        setVaccineModalVisible(true);
        setModalType('injection_update');
        break;
      case 'feedback':
        setVaccineModalVisible(true);
        setModalType('feedback');
        break;
      default:
    }
  }

  async function fetchResidentsWithStatus(): Promise<
    ResidentType[] | undefined
  > {
    const resWithStatus = await ecoIdApi.fetchResidencesWithUpdateStatus();
    if (resWithStatus.status === 'success') {
      return resWithStatus.result.data;
    }
    return undefined;
  }

  async function fetchVaccineSurveyStats(): Promise<
    VaccineSurveyStatsType | undefined
  > {
    const response = await ecoIdApi.fetchVaccineSurveyStats();
    if (response.status === 'success') {
      return response.result.data;
    }
    return undefined;
  }

  async function fetchResidents() {
    setLoading(true);
    let residentsRes: ResidentType[] | undefined;
    let surveyStatsRes: VaccineSurveyStatsType | undefined;

    if (user?.syncedEcoid) {
      residentsRes = await fetchResidentsWithStatus();
      surveyStatsRes = await fetchVaccineSurveyStats();
    } else {
      const res = await ecoIdApi.fetchResidences();
      if (res.status === 'success') {
        residentsRes = await fetchResidentsWithStatus();
        surveyStatsRes = await fetchVaccineSurveyStats();
      }
    }

    setResidents(residentsRes);
    setVaccineSurveyStats(surveyStatsRes);
    setLoading(false);
  }

  useEffect(() => {
    fetchResidents();
  }, [reloadAt]);

  function renderMenuItem(item: ItemDataType) {
    return (
      <TouchableWithoutFeedback onPress={() => handleMenuItemClick(item.key)}>
        <View style={styles.cardProcess}>
          {item.icon}

          <View style={styles.textCardProcess}>
            <Text fontSize="large" bold="bold">
              {renderItemTitle(item.key)}
            </Text>
            <Text style={styles.descText} color="grey">
              {renderItemDescription(item.key)}
            </Text>
          </View>

          <Icon
            iconPack="material"
            size={40}
            name="navigate-next"
            color="#918AA8"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <>
      {loading && <Loader style={styles.loader} />}

      {!loading && !residents && <NoResidentFound />}

      {!loading && residents && (
        <ScrollView style={styles.container}>
          <FlatList
            data={MENU_ITEMS}
            renderItem={item => renderMenuItem(item.item)}
            keyExtractor={item => item.key}
          />
        </ScrollView>
      )}

      <VaccineRegistrationModal
        visible={registrationExpiredModalVisible}
        title={i18n.t('features.vaccineDashboard.modelTitle.registerExpired')}
        onClose={() => setRegistrationExpiredModalVisible(false)}
      >
        <RegistrationExpired
          onClose={() => setRegistrationExpiredModalVisible(false)}
        />
      </VaccineRegistrationModal>

      <VaccineRegistrationModal
        visible={vaccineModalVisible}
        title={renderModalTitle(modalType)}
        onClose={onModalClose}
      >
        {residents && (
          <SelectResident
            residents={residents}
            navigateToForm={navigateToForm}
            selectType={modalType}
            surveyStats={vaccineSurveyStats}
          />
        )}
      </VaccineRegistrationModal>
    </>
  );
}
