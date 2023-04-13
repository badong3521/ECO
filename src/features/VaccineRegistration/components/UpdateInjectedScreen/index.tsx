import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import NavHeader from '../../../../components/NavHeader';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import ItemRadioButton from '../../../../components/ItemRadioButton';
import i18n from '../../../../i18n';
import { ResidentType } from '../../../../services/api/types/ecoid';
import Dropdown from '../Dropdown';
import RequiredValidation from '../../../../components/Form/validators';
import InputDatePicker from '../../../../components/InputDatePicker';
import { ImageType } from '../../types';
import SingleImagePicker from '../SingleImagePicker';
import PhotoView, { PhotoViewRef } from '../../../../components/PhotoView';
import { PhotoType } from '../../../../components/Card/types';
import DirectEcoidApi from '../../../../services/api/directEcoid';
import { HospitalType, VaccineType } from '../../../../services/api/types/directEcoid';
import Loader from '../../../../components/Loader';
import DialogManager from '../../../../components/Dialog/manager';
import { INJECTION_YES } from '../AfterInjectionUpdateScreen';
import EcoIdApi from '../../../../services/api/ecoId';
import SurveySuccessModal from '../SurveySuccess';

import styles from './styles.css';
import shareStyles, { PLACEHOLDER_TEXT_COLOR } from '../shareStyles.css';

interface Props {
  navigation: any;
}

interface UpdateInjectedFormParams {
  injectionDate: Date;
  hospitalId: number;
  vaccineId: number;
  injectionTime: string;
  image1?: ImageType;
  image2?: ImageType;
}

const INJECTION_FIRST_TIME = '1';
const INJECTION_SECOND_TIME = '2';

const directEcoidApi = new DirectEcoidApi();
const ecoIdApi = new EcoIdApi();

export default function UpdateInjectedScreen(props: Props) {
  const { navigation } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [vaccines, setVaccines] = useState<VaccineType[]>([]);
  const [previewImages, setPreviewImages] = useState<PhotoType[]>([]);
  const photoRef = React.createRef<PhotoViewRef>();
  const resident: ResidentType = navigation.getParam('resident', {});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function onModalClose() {
    setModalVisible(false);
    navigation.navigate('VaccineDashboard', {
      reloadAt: new Date().getMilliseconds(),
    });
  }

  async function fetchFormData() {
    const hospitalResponse = await directEcoidApi.fetchVaccineHospital();
    const vaccineResponse = await directEcoidApi.fetchVaccine();

    if (hospitalResponse.status === 'success') {
      setHospitals(hospitalResponse.result.data);
    }
    if (vaccineResponse.status === 'success') {
      setVaccines(vaccineResponse.result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isSubmitted) setModalVisible(true);
  }, [isSubmitted]);

  useEffect(() => {
    fetchFormData();
  }, []);

  const { errors, setValue, register, handleSubmit, watch } = useForm<
    UpdateInjectedFormParams
  >({
    defaultValues: {
      injectionTime: INJECTION_FIRST_TIME,
    },
  });

  async function onSubmit(params: UpdateInjectedFormParams) {
    DialogManager.showLoadingDialog({ dismissible: true });
    const data = {
      ...params,
      residentId: resident?.residentId,
      injectionStatus: INJECTION_YES,
    };
    await ecoIdApi.submitAfterVaccineInjectionSurvey(data);
    DialogManager.dismissLoadingDialog();
    setIsSubmitted(true);
  }

  const image1 = watch('image1');
  const image2 = watch('image2');

  function handleUploadImage(data: any) {
    setValue(data.type, {
      uri: data.uri,
      sgid: data.sgid,
    });
  }

  function handleDeleteImage(type: string) {
    setValue(type, undefined);
  }

  function onImagePreviewPress(photoUrl: string) {
    setPreviewImages([{ photoUrl }]);
    photoRef.current?.show();
  }

  function isChecked(fieldName: string, id: string) {
    const value = watch(fieldName);
    return value && value === id ? 'checked' : 'unchecked';
  }

  function renderSubtitle() {
    if (!resident || !resident.locationCode || !resident.zoneName) {
      return '';
    }

    return `${resident.locationCode} | ${resident.zoneName}`;
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <Text
                  fontSize="small"
                  color="grey"
                  style={shareStyles.marginDefault}
                >
                  {i18n.t(
                    'features.afterInjectionUpdate.updateInjected.header',
                  )}
                </Text>
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
                    key="hospitalIdLabel"
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

                  <View style={[styles.groupRadio, shareStyles.marginDefault]}>
                    <Text bold="bold">
                      {i18n.t(
                        'features.afterInjectionUpdate.updateInjected.round',
                      )}
                    </Text>
                    <View
                      style={styles.itemRadio}
                      key={`injectionTime ${INJECTION_FIRST_TIME}`}
                    >
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
                    <View
                      style={styles.itemRadio}
                      key={`injectionTime ${INJECTION_SECOND_TIME}`}
                    >
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

                  <Text
                    key="birthdayLabel"
                    bold="bold"
                    style={{
                      ...styles.labelInput,
                      ...shareStyles.marginDefault,
                    }}
                  >
                    {i18n.t(
                      'features.afterInjectionUpdate.updateInjected.images',
                    )}
                  </Text>
                  <View style={styles.imageGroup}>
                    <SingleImagePicker
                      key="image1"
                      name="image1"
                      onImageAdded={attachment =>
                        handleUploadImage({
                          type: 'image1',
                          ...attachment,
                        })
                      }
                      uri={image1?.uri}
                      textPlaceholder={i18n.t(
                        'features.afterInjectionUpdate.updateInjected.addImage',
                      )}
                      onDeleteImage={() => handleDeleteImage('image1')}
                      error={errors?.image1}
                      onImagePreviewPress={onImagePreviewPress}
                    />

                    <SingleImagePicker
                      key="image2"
                      name="image2"
                      onImageAdded={attachment =>
                        handleUploadImage({
                          type: 'image2',
                          ...attachment,
                        })
                      }
                      uri={image2?.uri}
                      textPlaceholder={i18n.t(
                        'features.afterInjectionUpdate.updateInjected.addImage',
                      )}
                      onDeleteImage={() => handleDeleteImage('image2')}
                      error={errors?.image2}
                      onImagePreviewPress={onImagePreviewPress}
                    />
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
        <PhotoView images={previewImages} photoViewRef={photoRef} />
      </View>

      <SurveySuccessModal visible={modalVisible} onClose={onModalClose} />
    </>
  );
}
