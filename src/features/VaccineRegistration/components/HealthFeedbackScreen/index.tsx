import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import styles from './styles.css';
import NavHeader from '../../../../components/NavHeader';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import ItemRadioButton from '../../../../components/ItemRadioButton';
import i18n from '../../../../i18n';
import { ResidentType } from '../../../../services/api/types/ecoid';
import Dropdown from '../Dropdown';
import RequiredValidation from '../../../../components/Form/validators';
import shareStyles, { PLACEHOLDER_TEXT_COLOR } from '../shareStyles.css';
import InputDatePicker from '../../../../components/InputDatePicker';
import CheckboxFilterItem from '../../../../components/CheckboxFilterItem';
import DirectEcoidApi from '../../../../services/api/directEcoid';
import {
  HospitalType,
  InjectionSymptom,
  VaccineType,
} from '../../../../services/api/types/directEcoid';
import Loader from '../../../../components/Loader';
import { useUserState } from '../../../User/reducers';
import DialogManager from '../../../../components/Dialog/manager';
import EcoIdApi from '../../../../services/api/ecoId';
import SurveySuccessModal from '../SurveySuccess';

interface Props {
  navigation: any;
}

const INJECTION_FIRST_TIME = '1';
const INJECTION_SECOND_TIME = '2';
const SYMPTON_YES = '1';
const SYMPTON_NO = '0';

interface HealthFeedbackFormParams {
  injectionDate: Date;
  hospitalId: number;
  vaccineId: number;
  injectionTime: string;
  symptomStatus: string;
  symptoms: number[];
}

const directEcoidApi = new DirectEcoidApi();

export default function HealthFeedbackScreen(props: Props) {
  const { navigation } = props;
  const [userState] = useUserState();
  const { userLanguage } = userState;
  const ecoIdApi = new EcoIdApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [vaccines, setVaccines] = useState<VaccineType[]>([]);
  const [injectionSymptoms, setInjectionSymptoms] = useState<
    InjectionSymptom[]
  >([]);
  const [hasSymptom, setHasSymptom] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { errors, setValue, register, handleSubmit, watch } = useForm<
    HealthFeedbackFormParams
  >({
    defaultValues: {
      injectionTime: INJECTION_FIRST_TIME,
      symptoms: [],
    },
  });
  const symptoms = watch('symptoms');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function onModalClose() {
    setModalVisible(false);
    navigation.navigate('VaccineDashboard', {
      reloadAt: new Date().getMilliseconds(),
    });
  }

  async function featchFormData() {
    const hospitalResponse = await directEcoidApi.fetchVaccineHospital();
    const vaccineResponse = await directEcoidApi.fetchVaccine();
    const symptomsResponse = await directEcoidApi.fetchInjectionSymptoms();

    if (hospitalResponse.status === 'success') {
      setHospitals(hospitalResponse.result.data);
    }
    if (vaccineResponse.status === 'success') {
      setVaccines(vaccineResponse.result.data);
    }
    if (symptomsResponse.status === 'success') {
      setInjectionSymptoms(symptomsResponse.result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    featchFormData();
  }, []);

  useEffect(() => {
    if (isSubmitted) setModalVisible(true);
  }, [isSubmitted]);

  useEffect(() => {
    if (hasSymptom) {
      register('symptoms', {
        required: true,
        validate: value => {
          if (value && value.length === 0) {
            return 'errors.symptoms.required';
          }
          return undefined;
        },
      });
    } else register('symptoms', undefined);
  }, [hasSymptom]);

  async function onSubmit(params: HealthFeedbackFormParams) {
    DialogManager.showLoadingDialog({ dismissible: true });
    const data = {
      ...params,
      residentId: resident?.residentId,
      symptomStatus: hasSymptom ? SYMPTON_YES : SYMPTON_NO,
    };
    await ecoIdApi.submitHealthFeedbackSurvey(data);
    DialogManager.dismissLoadingDialog();
    setIsSubmitted(true);
  }

  const resident: ResidentType = navigation.getParam('resident', {});

  function renderSubtitle() {
    if (!resident || !resident.locationCode || !resident.zoneName) {
      return '';
    }

    return `${resident.locationCode} | ${resident.zoneName}`;
  }

  function isChecked(fieldName: string, id: string) {
    const value = watch(fieldName);
    return value && value === id ? 'checked' : 'unchecked';
  }

  function onCheckboxPressHandle(symptomId: number) {
    if (!hasSymptom) {
      return;
    }

    if (symptoms.indexOf(symptomId) >= 0) {
      setValue(
        'symptoms',
        symptoms.filter(s => s !== symptomId),
      );
    } else {
      setValue('symptoms', [...symptoms, symptomId]);
    }
  }

  function isSymptomSelected(symptomId: number) {
    return symptoms.indexOf(symptomId) >= 0;
  }

  function renderStyleHasSymptom() {
    if (hasSymptom) {
      return { ...styles.selectionText };
    }

    return { ...styles.selectionText, ...styles.disableText };
  }

  return (
    <>
      <View style={styles.container}>
        <NavHeader
          hasBackButton
          title={resident ? resident.fullName : ''}
          subtitle={renderSubtitle()}
          rightHeader={<View style={styles.rightHeader} />}
        />

        {loading && <Loader style={styles.loader} />}

        {!loading && (
          <>
            <ScrollView>
              <View style={styles.content}>
                <Form register={register} errors={errors} setValue={setValue}>
                  <Text
                    key="dateInjectedLabel"
                    bold="bold"
                    style={styles.labelInput}
                  >
                    <Text style={shareStyles.signRequired}>* </Text>
                    {i18n.t(
                      'features.afterInjectionUpdate.updateInjected.date',
                    )}
                  </Text>
                  <InputDatePicker
                    name="injectionDate"
                    rules={RequiredValidation}
                    value={watch('injectionDate')}
                    label=""
                    onValueChange={value => setValue('injectionDate', value)}
                    flatOutlined
                    showIcon
                    containerStyle={styles.inputContainer}
                    errorMessage={errors.injectionDate?.message}
                  />

                  <Text
                    key="locationIdLabel"
                    bold="bold"
                    style={styles.labelInput}
                  >
                    <Text style={shareStyles.signRequired}>* </Text>
                    {i18n.t(
                      'features.afterInjectionUpdate.updateInjected.location',
                    )}
                  </Text>
                  <View style={shareStyles.marginDefault}>
                    <Dropdown
                      name="hospitalId"
                      rules={RequiredValidation}
                      data={hospitals}
                      label={i18n.t(
                        'features.afterInjectionUpdate.updateInjected.placeholderLocation',
                      )}
                      type="round"
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      style={styles.input}
                      value={watch('hospitalId')}
                      onChangeText={value => setValue('hospitalId', value)}
                      valueExtractor={item => item.hospitalId}
                      labelExtractor={item => item.name}
                      errorMessage={errors.hospitalId?.type}
                      itemCount={7}
                    />
                  </View>

                  <Text
                    key="vaccineIdLabel"
                    bold="bold"
                    style={styles.labelInput}
                  >
                    <Text style={shareStyles.signRequired}>* </Text>
                    {i18n.t(
                      'features.afterInjectionUpdate.updateInjected.type',
                    )}
                  </Text>
                  <View style={shareStyles.marginDefault}>
                    <Dropdown
                      name="vaccineId"
                      rules={RequiredValidation}
                      data={vaccines}
                      label={i18n.t(
                        'features.afterInjectionUpdate.updateInjected.placeholderType',
                      )}
                      type="round"
                      placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                      style={styles.input}
                      value={watch('vaccineId')}
                      onChangeText={value => setValue('vaccineId', value)}
                      valueExtractor={item => item.vaccineId}
                      labelExtractor={item => item.name}
                      errorMessage={errors.vaccineId?.type}
                      itemCount={7}
                    />
                  </View>

                  <View style={styles.groupRadio}>
                    <Text bold="bold">
                      {i18n.t(
                        'features.afterInjectionUpdate.updateInjected.round',
                      )}
                    </Text>
                    <View style={styles.itemRadio}>
                      <ItemRadioButton
                        name="injectionTime"
                        value={watch('injectionTime')}
                        status={isChecked(
                          'injectionTime',
                          INJECTION_FIRST_TIME,
                        )}
                        onPress={() =>
                          setValue('injectionTime', INJECTION_FIRST_TIME)
                        }
                        style={styles.radioButton}
                        label={i18n.t(
                          'features.afterInjectionUpdate.updateInjected.firstRound',
                        )}
                      />
                    </View>
                    <View style={styles.itemRadio}>
                      <ItemRadioButton
                        name="injectionTime"
                        value={watch('injectionTime')}
                        status={isChecked(
                          'injectionTime',
                          INJECTION_SECOND_TIME,
                        )}
                        onPress={() =>
                          setValue('injectionTime', INJECTION_SECOND_TIME)
                        }
                        style={styles.radioButton}
                        label={i18n.t(
                          'features.afterInjectionUpdate.updateInjected.secondRound',
                        )}
                      />
                    </View>
                  </View>

                  <View style={styles.groupRadio}>
                    <Text bold="bold">
                      {i18n.t(
                        'features.afterInjectionUpdate.updateInjected.title',
                      )}
                    </Text>
                    <View style={styles.itemRadio}>
                      <ItemRadioButton
                        value={SYMPTON_NO}
                        status={hasSymptom ? 'unchecked' : 'checked'}
                        onPress={() => setHasSymptom(false)}
                        style={styles.radioButton}
                        label={i18n.t('actions.no')}
                      />
                    </View>
                    <View style={styles.itemRadio}>
                      <ItemRadioButton
                        value={SYMPTON_YES}
                        status={hasSymptom ? 'checked' : 'unchecked'}
                        onPress={() => setHasSymptom(true)}
                        style={styles.radioButton}
                        label={i18n.t('actions.yes')}
                      />
                    </View>
                  </View>

                  <Text
                    bold="bold"
                    style={[
                      styles.headerMultiChose,
                      !hasSymptom && styles.disableText,
                    ]}
                  >
                    {i18n.t(
                      'features.afterInjectionUpdate.updateInjected.titleServay',
                    )}
                  </Text>

                  <View>
                    {injectionSymptoms.map(item => (
                      <CheckboxFilterItem
                        key={item.symptomId}
                        title={
                          userLanguage === 'en' ? item.titleEn : item.titleVi
                        }
                        value={isSymptomSelected(item.symptomId)}
                        onValueChange={() =>
                          onCheckboxPressHandle(item.symptomId)
                        }
                        styleContainer={styles.checkbox}
                        styleText={renderStyleHasSymptom()}
                        disabled={!hasSymptom}
                      />
                    ))}
                  </View>
                </Form>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <Button
                type="primary"
                uppercase={false}
                onPress={handleSubmit(onSubmit)}
                title={i18n.t(
                  'features.afterInjectionUpdate.updateNoInjection.button',
                )}
              />
            </View>
          </>
        )}
      </View>

      <SurveySuccessModal visible={modalVisible} onClose={onModalClose} />
    </>
  );
}
