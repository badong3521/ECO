import React, { useEffect, useState } from 'react';
import { FlatList, TextStyle, View, ScrollView } from 'react-native';

import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import {
  RegistrationStatusCodeTypes,
  ResidentType,
} from '../../../../services/api/types/ecoid';
import i18n from '../../../../i18n';
import NoRegistrationFound from '../NoRegistrationFound';
import EcoIdApi from '../../../../services/api/ecoId';

import styles from './styles.css';
import { applicationDimensions } from '../../../../../style.css';

interface PropsType {
  navigation: any;
}

export default function RegistrationList(props: PropsType) {
  const { navigation } = props;
  const residentsParam: ResidentType[] = navigation.getParam('residents');
  const [loading, setLoading] = useState<boolean>(!residentsParam);
  const [residents, setResidents] = useState<ResidentType[]>(
    residentsParam || [],
  );
  const ecoIdApi = new EcoIdApi();

  const registedResidents = residents.filter(
    resident => resident.registrationStatusCode !== 'UNSUBMITTED',
  );

  function renderStatusBag(status: RegistrationStatusCodeTypes) {
    switch (status) {
      case 'SUBMITTED':
      case 'EDITED':
        return statusBagItem(
          i18n.t('features.vaccineRegistrationList.verifying'),
          styles.verifying,
        );
      case 'VERIFIED':
        return statusBagItem(
          i18n.t('features.vaccineRegistrationList.verified'),
          styles.verified,
        );
      case 'EDITING':
        return statusBagItem(
          i18n.t('features.vaccineRegistrationList.need_updating'),
          styles.needUpdate,
        );
      case 'UNVERIFIED':
        return statusBagItem(
          i18n.t('features.vaccineRegistrationList.rejected'),
          styles.rejected,
        );
      default:
        return <></>;
    }
  }

  function statusBagItem(text: string, style?: TextStyle) {
    return (
      <Text fontSize="small" style={[styles.statusBag, style]}>
        {text}
      </Text>
    );
  }

  function renderResidentNote(resident: ResidentType) {
    switch (resident.registrationStatusCode) {
      case 'EDITING':
        return renderNote(resident, styles.needUpdateNote, undefined, true);
      case 'UNVERIFIED':
        return renderNote(
          resident,
          styles.unverifiedNote,
          i18n.t('features.vaccineRegistrationList.rejectNote'),
        );
      default:
        return <></>;
    }
  }

  function navigateToForm(resident: ResidentType) {
    navigation.navigate('VaccineRegistrationScreen', {
      resident,
    });
  }

  function renderNote(
    resident: ResidentType,
    style?: TextStyle,
    noteText?: string,
    editable?: boolean,
  ) {
    return (
      <>
        <View style={styles.note}>
          <Icon
            name="info"
            size={applicationDimensions.iconSize}
            color={style?.color}
          />
          <Text fontSize="small" style={[styles.textNote, style]}>
            {noteText || resident.reasonIncorrect || ''}
          </Text>
        </View>

        {editable && (
          <View style={styles.editButtonContainer}>
            <Button
              style={styles.editButton}
              type="primary"
              title={i18n.t('actions.edit')}
              onPress={() => navigateToForm(resident)}
              uppercase={false}
            />
          </View>
        )}
      </>
    );
  }

  function renderResident(resident: ResidentType) {
    return (
      <View style={styles.residentItem}>
        <View style={[styles.row, styles.firstRow]}>
          <Text bold="bold" style={styles.firstText} numberOfLines={2}>
            {resident.fullName}
          </Text>

          {renderStatusBag(resident.registrationStatusCode)}
        </View>

        <View style={styles.row}>
          <Text style={styles.firstText} fontSize="small" color="grey">
            {`${resident.locationCode} | ${resident.zoneName}`}
          </Text>

          <Text fontSize="small" color="grey">
            {resident.updatedDate || resident.createdDate || ''}
          </Text>
        </View>

        {renderResidentNote(resident)}
      </View>
    );
  }

  async function fetchResidents() {
    if (residentsParam) return;

    setLoading(true);
    const response = await ecoIdApi.fetchResidencesWithUpdateStatus();
    if (response.status === 'success') {
      setResidents(response.result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchResidents();
  }, []);

  return (
    <>
      {loading && <Loader style={styles.loader} />}

      {!loading && registedResidents.length === 0 && <NoRegistrationFound />}

      {!loading && registedResidents.length !== 0 && (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.containerStyle}
        >
          <Text fontSize="small" color="grey" style={styles.descText}>
            {i18n.t('features.vaccineRegistrationList.descText')}
          </Text>
          <FlatList
            data={registedResidents}
            renderItem={item => renderResident(item.item)}
            keyExtractor={item => item.residentId.toString()}
          />
        </ScrollView>
      )}
    </>
  );
}
