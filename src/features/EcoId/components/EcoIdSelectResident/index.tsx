import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../components/Text';
import DetectedResidentItem from './components/DetectedResidentItem';
import Button from '../../../../components/Button';
import { applicationColors } from '../../../../../style.css';
import { ResidentType } from '../../../../services/api/types/ecoid';
import EcoIdApi from '../../../../services/api/ecoId';
import { useUserState } from '../../../User/reducers';
import { fetchResidenceScreenProps } from '../../../../utils/ecoId';

interface EcoIdSelectResidentScreenProps {
  navigation: any;
}

// This screen will be shown when found some residents for user
// And user will select the correct her/his residents to sync to user's EcoID
export default function EcoIdSelectResidentScreen(
  props: EcoIdSelectResidentScreenProps,
) {
  const { navigation } = props;
  const i18n = useTranslation();
  const ecoIdApi = new EcoIdApi();
  const [, userActions] = useUserState();
  const residents: ResidentType[] = navigation.getParam('residents');
  const redirectAfterSuccess = navigation.getParam('redirectAfterSuccess');
  const successCallback = navigation.getParam('successCallback');
  const [selectedResident, setSelectedResident] = useState<ResidentType[]>(
    navigation.getParam('syncedResidences') || [],
  );
  const [loading, setLoading] = useState<boolean>(false);

  function onContactUsPress() {
    navigation.navigate('HelpDeskScreen');
  }

  async function onStartButtonPress() {
    if (redirectAfterSuccess) {
      if (successCallback) successCallback();
      navigation.navigate(redirectAfterSuccess);
    } else {
      navigation.popToTop();
      if (selectedResident) {
        if (selectedResident.length === 1) {
          const residenceScreenProps = await fetchResidenceScreenProps(
            selectedResident[0].residentId,
            navigation,
          );
          if (residenceScreenProps) {
            navigation.navigate('ResidenceScreen', residenceScreenProps);
          }
        }
      }
    }
  }

  async function onContinuePress() {
    if (selectedResident && selectedResident.length > 0) {
      setLoading(true);
      const res = await ecoIdApi.syncEcoId({
        ecoid: residents.find(resident => !!resident.ecoid)?.ecoid!,
        residences: selectedResident,
      });
      setLoading(false);
      if (res.status === 'success') {
        userActions.setReloadUserDashboard(true);
        userActions.setUser(res.result.data);
        navigation.goBack();
        navigation.navigate('EcoIdSuccessfulScreen', {
          title: i18n.t(
            'features.ecoId.ecoIdSelectResidentScreen.success.header',
          ),
          message: i18n.t(
            'features.ecoId.ecoIdSelectResidentScreen.success.body',
          ),
          button: i18n.t(
            'features.ecoId.ecoIdSelectResidentScreen.success.start',
          ),
          onButtonPress: onStartButtonPress,
        });
      } else {
        navigation.navigate('EcoIdFailedScreen', {
          title: 'features.ecoId.ecoIdFailedScreen.title',
          message: 'features.ecoId.ecoIdFailedScreen.message',
          button: 'features.ecoId.ecoIdFailedScreen.contactUs',
        });
      }
    }
  }

  function onResidentItemPress(resident: ResidentType) {
    const existedIndex = selectedResident.findIndex(
      r => r.residentId === resident.residentId,
    );
    const tempResidents = Array.from(selectedResident);
    if (existedIndex >= 0) {
      tempResidents.splice(existedIndex, 1);
      setSelectedResident(tempResidents);
    } else {
      setSelectedResident(tempResidents.concat(resident));
    }
  }

  function renderResidentItem(value: ResidentType): React.ReactNode {
    return (
      <DetectedResidentItem
        key={value.residentId}
        onPress={() => onResidentItemPress(value)}
        checked={
          !!selectedResident.find(
            resident => resident.residentId === value.residentId,
          )
        }
        resident={value}
      />
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.description} fontSize="small">
            {i18n.t('features.ecoId.ecoIdSelectResidentScreen.description')}
          </Text>
          {residents && residents.map(renderResidentItem)}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          title={i18n.t('features.ecoId.ecoIdSelectResidentScreen.contactUs')}
          containerStyle={styles.buttonContainer}
          style={styles.buttonHelpDesk}
          labelStyle={styles.buttonLabel}
          onPress={onContactUsPress}
          type="secondary"
          uppercase={false}
        />
        <Button
          title={i18n.t('features.ecoId.ecoIdSelectResidentScreen.continue')}
          containerStyle={styles.buttonContainer}
          style={styles.buttonContinue}
          onPress={onContinuePress}
          type="primary"
          disable={!(selectedResident.length > 0)}
          color={applicationColors.semantic.info.shade500}
          uppercase={false}
          loading={loading}
        />
      </View>
    </View>
  );
}
