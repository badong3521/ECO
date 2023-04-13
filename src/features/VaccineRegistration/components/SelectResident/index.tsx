import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableWithoutFeedback, View } from 'react-native';
import {
  RegistrationStatusCodeTypes,
  ResidentType,
  VaccineSurveyStatsType,
} from '../../../../services/api/types/ecoid';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import RadioButton from '../../../../components/RadioButton';
import Icon from '../../../../components/Icon';
import { ItemMenuType } from '../../types';

import styles from './style.css';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export const registedStatuses: RegistrationStatusCodeTypes[] = [
  'SUBMITTED',
  'VERIFIED',
  'EDITED',
  'UNVERIFIED',
];

interface Props {
  residents: ResidentType[];
  navigateToForm: (resident: ResidentType) => void;
  selectType?: ItemMenuType;
  surveyStats?: VaccineSurveyStatsType;
}

export default function SelectResident(props: Props) {
  const { i18n } = useTranslation();
  const { residents, navigateToForm, selectType, surveyStats } = props;
  const locationCodes = residents.map(resident => getLoactionCode(resident));
  const uniqLocationCodes = [...new Set(locationCodes)];
  const isShowLocationCodeSeletion = uniqLocationCodes.length === 1;

  const [locationSelected, setLocationSelected] = useState<string>();
  const [residentSelected, setResidentSelected] = useState<ResidentType>();
  const [currentStep, setCurrentStep] = useState<number>(
    isShowLocationCodeSeletion ? 2 : 1,
  );
  const isResidentSurveySelect =
    selectType === 'injection_update' || selectType === 'feedback';
  const residentsByLocation = locationSelected
    ? residents.filter(
        resident => getLoactionCode(resident) === locationSelected,
      )
    : residents;
  const unRegistedResidents = residentsByLocation.filter(
    resident => !isRegisteredResident(resident),
  );

  function onNextStep() {
    setCurrentStep(currentStep + 1);
  }

  function renderResidenceSelection() {
    return (
      <View style={styles.containerStep}>
        <Text bold="semiBold" style={styles.header}>
          {i18n.t('components.selectResident.titleAccommodation')}
        </Text>
        {uniqLocationCodes.map(location => {
          return (
            <TouchableWithoutFeedback
              key={location}
              onPress={() => setLocationSelected(location)}
            >
              <View style={styles.cell}>
                <RadioButton
                  value="value"
                  onPress={() => setLocationSelected(location)}
                  status={
                    location === locationSelected ? 'checked' : 'unchecked'
                  }
                  style={styles.radio}
                />
                <Text>{location}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <Button
          style={styles.button}
          title={i18n.t('actions.next')}
          type="primary"
          disable={!locationSelected}
          onPress={onNextStep}
          uppercase={false}
        />
      </View>
    );
  }

  function renderResidentSelections() {
    if (isResidentSurveySelect) return renderResidentSurveySelections();

    return (
      <View style={styles.containerStep}>
        <Text bold="semiBold" style={styles.header}>
          {unRegistedResidents.length === 0
            ? i18n.t('components.selectResident.unselectableTitle')
            : i18n.t('components.selectResident.title')}
        </Text>

        <View style={styles.note}>
          <Icon
            name="info"
            size={applicationDimensions.iconSize}
            color={applicationColors.neutral.shade500}
            style={styles.iconNote}
          />
          <Text color="grey" style={styles.noteText}>
            {i18n.t('components.selectResident.selectNote')}
          </Text>
        </View>

        {residentsByLocation.map(resident => {
          const isRegistered = isRegisteredResident(resident);
          const isOwner = resident.isOwner === 1;

          function handleResidentSelected() {
            if (isRegistered) {
              return;
            }

            setResidentSelected(resident);
          }

          return (
            <TouchableWithoutFeedback
              key={resident.residentId}
              onPress={handleResidentSelected}
            >
              <View style={styles.cell}>
                <View style={styles.textGroup}>
                  <RadioButton
                    value="value"
                    onPress={handleResidentSelected}
                    status={
                      resident === residentSelected ? 'checked' : 'unchecked'
                    }
                    style={styles.radio}
                  />
                  <View
                    style={[styles.name, isRegistered && styles.nameRegistered]}
                  >
                    <Text style={[isRegistered && styles.nameDisable]}>
                      {`${resident.fullName}`}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.containerRelationshipName,
                      isOwner && styles.containerRelationshipNameOwner,
                    ]}
                  >
                    <Text
                      fontSize="tiny"
                      bold="bold"
                      style={[
                        styles.relationshipName,
                        isOwner && styles.relationshipNameOwner,
                      ]}
                    >
                      {`${resident.relationshipName}`}
                    </Text>
                  </View>
                </View>

                {isRegistered &&
                  resident.registrationStatusCode !== 'UNVERIFIED' && (
                    <View style={styles.registerStatus}>
                      <Text style={styles.textRegistered} numberOfLines={1}>
                        {i18n.t('components.selectResident.registered')}
                      </Text>
                      <Icon
                        iconPack="material"
                        color={applicationColors.semantic.success.shade500}
                        size={20}
                        name="check-circle"
                      />
                    </View>
                  )}
                {isRegistered &&
                  resident.registrationStatusCode === 'UNVERIFIED' && (
                    <View style={styles.registerStatus}>
                      <Text style={styles.textUnverified} numberOfLines={1}>
                        {i18n.t('components.selectResident.unverified')}
                      </Text>
                    </View>
                  )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <Button
          style={styles.button}
          title={i18n.t('actions.next')}
          type="primary"
          disable={!residentSelected}
          onPress={() => navigateToForm(residentSelected!)}
          uppercase={false}
        />
      </View>
    );
  }

  function renderResidentSurveySelections() {
    return (
      <View style={styles.containerStep}>
        <Text bold="semiBold" style={styles.header}>
          {i18n.t('components.selectResident.title')}
        </Text>

        {residentsByLocation.map(resident => {
          const totalSurveyDone =
            selectType === 'injection_update'
              ? surveyStats?.surveyInjection.find(
                  survey => survey.residentId === resident.residentId,
                )?.total
              : surveyStats?.surveyHealth.find(
                  survey => survey.residentId === resident.residentId,
                )?.total;

          return (
            <TouchableWithoutFeedback
              key={resident.residentId}
              onPress={() => setResidentSelected(resident)}
            >
              <View style={styles.cell}>
                <View style={styles.textGroup}>
                  <RadioButton
                    value="value"
                    onPress={() => setResidentSelected(resident)}
                    status={
                      resident === residentSelected ? 'checked' : 'unchecked'
                    }
                    style={styles.radio}
                  />
                  <View style={styles.name}>
                    <Text>{`${resident.fullName}`}</Text>
                    <Text
                      color="grey"
                      fontSize="small"
                      style={styles.totalSurvey}
                    >
                      {totalSurveyDone && totalSurveyDone !== 0
                        ? i18n.t('components.selectResident.surveySubmitted', {
                            total: totalSurveyDone,
                          })
                        : i18n.t('components.selectResident.doSurvey')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
        <Button
          style={styles.button}
          title={i18n.t('actions.next')}
          type="primary"
          disable={!residentSelected}
          onPress={() => navigateToForm(residentSelected!)}
          uppercase={false}
        />
      </View>
    );
  }

  return (
    <>
      {currentStep === 1
        ? renderResidenceSelection()
        : renderResidentSelections()}
    </>
  );
}

function getLoactionCode(resident: ResidentType) {
  return `${resident.locationCode} | ${resident.areaName}`;
}

function isRegisteredResident(resident: ResidentType) {
  return registedStatuses.indexOf(resident.registrationStatusCode) >= 0;
}
