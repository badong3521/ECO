import React, { memo, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import Form from '../../../../components/Form';
import Text from '../../../../components/Text';
import EInput from '../../../../components/Input';
import Icon from '../../../../components/Icon';
import RequiredValidation from '../../../../components/Form/validators';
import PhoneNumberValidation from '../../../../components/Form/validators/phone_number';
import InputDatePicker from '../../../../components/InputDatePicker';
import DialogManager from '../../../../components/Dialog/manager';
import DirectEcoidApi from '../../../../services/api/directEcoid';

import Input from '../Input';
import Dropdown from '../Dropdown';
import FormCMND from './components/FormCMND';
import FormPassport from './components/FormPassport';
import BirthCertificateScan from './components/BirthCertificateScan';
import ItemRadioButton from '../ItemRadioButton';
import {
  ResidentFormDataType,
  VerificationType,
} from '../../../../services/api/types/ecoid';
import { AreaType } from '../../../../services/api/types/directEcoid';
import { UserType } from '../../../User/types';
import i18n from '../../../../i18n';
import { ImageType } from '../../types';
import { urlToImageType } from '../../../../utils/userFormData';
import { convertTo84 } from '../../../../utils/phoneNumber';

import styles from './styles.css';
import shareStyles from '../shareStyles.css';
import { applicationColors } from '../../../../../style.css';

interface Props {
  resident: ResidentFormDataType;
  areaData: AreaType;
  user: UserType;
  onPressContinue: (params: StepOneFormParams) => void;
  onImagePreviewPress: (photoUrl: string) => void;
}

export interface StepOneFormParams {
  isRegisterOthers: boolean;
  fullName: string;
  birthday: Date;
  gender: string;
  phoneNumber: string;
  insuranceNumber: string;
  career: string;
  workPlace: string;
  verificationType: VerificationType;
  nationId: number;

  identityNumber?: string;
  identityIssueDate?: Date;
  identityIssuePlace?: string;
  identityScanFront?: ImageType;
  identityScanBack?: ImageType;
  provinceId?: number;
  districtId?: number;
  communeId?: number;
  village?: string;

  passportNumber?: string;
  passportSignDate?: Date;
  passportExpiryDate?: Date;
  countryId?: number;
  passportScan?: ImageType;

  birthCertificateScan?: ImageType;
}

const MALE = '1';
const FEMALE = '0';
const IDENTITY = 'IDENTITY';
const PASSPORT = 'PASSPORT';
const BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE';

const PLACEHOLDER_TEXT_COLOR = '#A7ABC3';

function StepOne(props: Props) {
  const {
    resident,
    user,
    areaData,
    onPressContinue,
    onImagePreviewPress,
  } = props;
  const { errors, setValue, register, handleSubmit, watch, setError } = useForm<
    StepOneFormParams
  >({
    defaultValues: {
      isRegisterOthers: resident.isRegisterOthers,
      fullName: resident.fullName,
      birthday: resident.birthday ? new Date(resident.birthday) : new Date(),
      gender: resident.gender?.toString(),
      phoneNumber: resident.phoneNumber || user.phoneNumber,
      nationId: resident.nationId,
      insuranceNumber: resident.insuranceNumber,
      verificationType: resident.verificationType || 'IDENTITY',
      identityNumber: resident.identityNumber,
      identityIssueDate: resident.identityIssueDate
        ? new Date(resident.identityIssueDate)
        : undefined,
      identityIssuePlace: resident.identityIssuePlace,
      passportNumber: resident.passportNumber,
      passportSignDate: resident.passportSignDate
        ? new Date(resident.passportSignDate)
        : undefined,
      passportExpiryDate: resident.passportExpiryDate
        ? new Date(resident.passportExpiryDate)
        : undefined,
      countryId: resident.countryId,
      career: resident.career,
      workPlace: resident.workPlace,
      village: resident.village,
      provinceId: resident.provinceId,
      districtId: resident.districtId,
      communeId: resident.communeId,
    },
  });
  const directEcoidApi = new DirectEcoidApi();

  const verificationTypes = [
    {
      id: IDENTITY,
      value: i18n.t('features.vaccineRegistrationScreen.stepOne.identityCard'),
    },
    {
      id: PASSPORT,
      value: i18n.t('features.vaccineRegistrationScreen.stepOne.passport'),
    },
    {
      id: BIRTH_CERTIFICATE,
      value: i18n.t(
        'features.vaccineRegistrationScreen.stepOne.birthCertificate',
      ),
    },
  ];

  const verificationType = watch('verificationType');
  const provinceId = watch('provinceId');
  const districtId = watch('districtId');
  const districtOptions = provinceId
    ? areaData.district.filter(district => district.provinceId === provinceId)
    : [];
  const communeOptions = districtId
    ? areaData.commune.filter(commune => commune.districtId === districtId)
    : [];

  async function onSubmit(params: StepOneFormParams) {
    if (
      resident.registrationStatusCode === 'EDITING' &&
      convertTo84(params.phoneNumber) === convertTo84(resident.phoneNumber)
    ) {
      onPressContinue(params);
    } else {
      DialogManager.showLoadingDialog({ dismissible: true });
      const validateEms = await directEcoidApi.validatePhoneInUsed(params.phoneNumber);
      DialogManager.dismissLoadingDialog();

      if (validateEms.status === 'success') {
        onPressContinue(params);
      } else {
        setError('phoneNumber', {
          type: 'validate',
          message: i18n.t(
            'features.vaccineRegistrationScreen.errors.phoneInUsed',
          ),
        });
      }
    }
  }

  function renderFormContent(): ReactElement {
    switch (verificationType) {
      case IDENTITY:
        return (
          <FormCMND
            watch={watch}
            setValue={setValue}
            errors={errors}
            onImagePreviewPress={onImagePreviewPress}
          />
        );
      case PASSPORT:
        /* eslint-disable react/prop-types */
        return (
          <FormPassport
            watch={watch}
            setValue={setValue}
            countries={resident.countries}
            errors={errors}
            onImagePreviewPress={onImagePreviewPress}
          />
        );
      case BIRTH_CERTIFICATE:
        return (
          <BirthCertificateScan
            watch={watch}
            setValue={setValue}
            errors={errors}
            onImagePreviewPress={onImagePreviewPress}
          />
        );
      default:
        return <></>;
    }
  }

  function renderLocalDropdown() {
    return (
      <View style={styles.localGroup}>
        <View style={styles.localItem}>
          <Text
            key="provinceIdLabel"
            bold="bold"
            style={styles.labelInput}
            numberOfLines={1}
          >
            {i18n.t('features.vaccineRegistrationScreen.stepOne.city')}
          </Text>
          <View style={shareStyles.marginDefault}>
            <Dropdown
              /* eslint-disable react/prop-types */
              data={areaData.province || []}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              type="round"
              style={styles.input}
              value={watch('provinceId')}
              onChangeText={item => setValue('provinceId', item)}
              valueExtractor={item => item.provinceId}
              labelExtractor={item => item.name}
              errorMessage={errors.provinceId?.type}
              itemCount={7}
            />
          </View>
        </View>

        <View style={styles.localItem}>
          <Text key="districtIdLabel" bold="bold" style={styles.labelInput}>
            {i18n.t('features.vaccineRegistrationScreen.stepOne.district')}
          </Text>
          <View style={shareStyles.marginDefault}>
            <Dropdown
              data={districtOptions}
              style={styles.input}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              type="round"
              value={watch('districtId')}
              onChangeText={item => setValue('districtId', item)}
              valueExtractor={item => item.districtId}
              labelExtractor={item => item.name}
              errorMessage={errors.districtId?.type}
              itemCount={7}
            />
          </View>
        </View>

        <View style={styles.localItem}>
          <Text key="communeIdLabel" bold="bold" style={styles.labelInput}>
            {i18n.t('features.vaccineRegistrationScreen.stepOne.commune')}
          </Text>
          <View style={shareStyles.marginDefault}>
            <Dropdown
              data={communeOptions}
              style={styles.input}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              type="round"
              value={watch('communeId')}
              onChangeText={item => setValue('communeId', item)}
              valueExtractor={item => item.communeId}
              labelExtractor={item => item.name}
              errorMessage={errors.communeId?.type}
              itemCount={5}
            />
          </View>
        </View>
      </View>
    );
  }

  function isChecked(fieldName: string, id: string) {
    const value = watch(fieldName);
    return value && value === id ? 'checked' : 'unchecked';
  }

  function renderGroupInputLocal(): ReactElement {
    if (verificationType !== IDENTITY) {
      return <></>;
    }

    return (
      <>
        <View
          style={[
            shareStyles.defaultPaddingHorizontal,
            shareStyles.defaultPaddingTop,
          ]}
        >
          <View style={styles.containerLocalChose}>
            <Icon
              iconPack="material"
              name="info"
              size={13}
              color={applicationColors.neutral.shade500}
            />
            <Text fontSize="tiny" color="grey" style={styles.descLocalChose}>
              {i18n.t(
                'features.vaccineRegistrationScreen.stepOne.descritionLocation',
              )}
            </Text>
          </View>

          {renderLocalDropdown()}

          <Text key="villageLabel" bold="bold" style={styles.labelInput}>
            {i18n.t('features.vaccineRegistrationScreen.stepOne.province')}
          </Text>
          <Input
            label={i18n.t(
              'features.vaccineRegistrationScreen.stepOne.provincePlaceholder',
            )}
            inputStyle={...{ ...styles.input, ...shareStyles.marginDefault }}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            value={watch('village')}
            onChangeText={item => setValue('village', item)}
            errorMessage={errors.village?.type}
          />
        </View>

        <View style={shareStyles.separateBar} />
      </>
    );
  }

  useEffect(() => {
    let identityValidate = {};
    let passportValidate = {};
    let birthCerValidate = {};

    switch (verificationType) {
      case IDENTITY:
        identityValidate = RequiredValidation;
        passportValidate = {};
        birthCerValidate = {};
        break;
      case PASSPORT:
        identityValidate = {};
        passportValidate = RequiredValidation;
        birthCerValidate = {};
        break;
      case BIRTH_CERTIFICATE:
        identityValidate = {};
        passportValidate = {};
        birthCerValidate = RequiredValidation;
        break;
      default:
        identityValidate = {};
        passportValidate = {};
        birthCerValidate = {};
    }

    register('identityNumber', identityValidate);
    register('identityIssueDate', identityValidate);
    register('identityIssuePlace', identityValidate);
    register('identityScanFront', identityValidate);
    register('identityScanBack', identityValidate);
    register('provinceId', identityValidate);
    register('districtId', identityValidate);
    register('communeId', identityValidate);
    register('village');

    register('passportNumber', passportValidate);
    register('passportSignDate', passportValidate);
    register('passportExpiryDate', passportValidate);
    register('countryId', passportValidate);
    register('passportScan', passportValidate);

    register('birthCertificateScan', birthCerValidate);
  }, [verificationType]);

  useEffect(() => {
    setValue('identityScanFront', urlToImageType(resident.identityScanFront));
  }, [resident.identityScanFront]);
  useEffect(() => {
    setValue('identityScanBack', urlToImageType(resident.identityScanBack));
  }, [resident.identityScanBack]);
  useEffect(() => {
    setValue('passportScan', urlToImageType(resident.passportScan));
  }, [resident.passportScan]);
  useEffect(() => {
    setValue(
      'birthCertificateScan',
      urlToImageType(resident.birthCertificateScan),
    );
  }, [resident.birthCertificateScan]);

  useEffect(() => {
    register('birthday', RequiredValidation);
  }, []);

  return (
    <ScrollView
      style={styles.formContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={shareStyles.marginDefault}>
        <Form register={register} errors={errors} setValue={setValue}>
          <View style={shareStyles.defaultPaddingHorizontal}>
            <View style={shareStyles.marginDefault}>
              <Text bold="bold" fontSize="large" style={{ marginBottom: 8 }}>
                {i18n.t('features.vaccineRegistrationScreen.stepOne.title')}
              </Text>
              <Text color="grey">
                {i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.description',
                )}
              </Text>
            </View>

            <Text key="fullNameLabel" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.fullName')}
            </Text>
            <EInput
              name="fullName"
              value={watch('fullName')}
              rules={RequiredValidation}
              flatOutlined
              containerStyle={styles.inputContainer}
              errorMessage={errors.fullName?.message}
            />

            <Text key="birthdayLabel" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.birthday')}
            </Text>
            <InputDatePicker
              name="birthday"
              value={watch('birthday')}
              label=""
              onValueChange={value => setValue('birthday', value)}
              flatOutlined
              showIcon
              containerStyle={styles.inputContainer}
              errorMessage={errors.birthday?.message}
            />

            <Text key="gender_label" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.gender')}
            </Text>
            <View style={[styles.groupRadio, shareStyles.marginDefault]}>
              <View style={styles.itemRadio}>
                <ItemRadioButton
                  name="gender"
                  value={watch('gender')}
                  status={isChecked('gender', MALE)}
                  onPress={() => setValue('gender', MALE)}
                  style={styles.radioButton}
                  label={i18n.t(
                    'features.vaccineRegistrationScreen.stepOne.male',
                  )}
                />
              </View>
              <View style={styles.itemRadio}>
                <ItemRadioButton
                  name="gender"
                  value={watch('gender')}
                  status={isChecked('gender', FEMALE)}
                  onPress={() => setValue('gender', FEMALE)}
                  style={styles.radioButton}
                  label={i18n.t(
                    'features.vaccineRegistrationScreen.stepOne.female',
                  )}
                />
              </View>
            </View>

            <Text key="phoneNumberLabel" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.phoneNumber')}
            </Text>
            <EInput
              name="phoneNumber"
              value={watch('phoneNumber')}
              rules={PhoneNumberValidation}
              keyboardType="phone-pad"
              flatOutlined
              containerStyle={styles.inputContainer}
              errorMessage={errors.phoneNumber?.message}
            />

            <Text key="nationIdLabel" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.nation')}
            </Text>
            <View style={shareStyles.marginDefault}>
              <Dropdown
                name="nationId"
                rules={RequiredValidation}
                data={resident.nations || []}
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.nationPlaceholder',
                )}
                type="round"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                style={styles.input}
                value={watch('nationId')}
                onChangeText={value => setValue('nationId', value)}
                valueExtractor={item => item.nationId}
                labelExtractor={item => item.name}
                errorMessage={errors.nationId?.type}
                itemCount={7}
              />
            </View>

            <Text
              key="insuranceNumberLable"
              bold="bold"
              style={styles.labelInput}
            >
              {i18n.t('features.vaccineRegistrationScreen.stepOne.insurrance')}
            </Text>
            <Input
              name="insuranceNumber"
              value={watch('insuranceNumber')}
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepOne.insurrancePlaceholder',
              )}
              inputStyle={...{ ...styles.input, ...shareStyles.marginDefault }}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            />
          </View>

          <View style={shareStyles.separateBar} />

          <View
            style={[
              shareStyles.defaultPaddingHorizontal,
              shareStyles.defaultPaddingTop,
            ]}
          >
            <Text
              key="verificationTypeLabel"
              bold="bold"
              style={styles.labelInput}
            >
              {i18n.t(
                'features.vaccineRegistrationScreen.stepOne.verificationType',
              )}
            </Text>
            <View style={shareStyles.marginDefault}>
              <Dropdown
                data={verificationTypes}
                style={styles.input}
                name="verificationType"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                rules={RequiredValidation}
                type="round"
                value={verificationType}
                valueExtractor={value => value.id}
                labelExtractor={value => value.value}
              />
            </View>

            {renderFormContent()}
          </View>

          <View style={shareStyles.separateBar} />

          {renderGroupInputLocal()}

          <View
            style={[
              shareStyles.defaultPaddingHorizontal,
              shareStyles.defaultPaddingTop,
            ]}
          >
            <Text key="career_label" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.career')}
            </Text>
            <View style={shareStyles.marginDefault}>
              <Dropdown
                data={resident.careers || []}
                name="career"
                rules={RequiredValidation}
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.careerPlaceholder',
                )}
                type="round"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                style={styles.input}
                value={watch('career')}
                valueExtractor={value => value}
                labelExtractor={value => value}
                itemCount={5}
              />
            </View>

            <Text key="workPlaceLabel" bold="bold" style={styles.labelInput}>
              {i18n.t('features.vaccineRegistrationScreen.stepOne.placeWork')}
            </Text>
            <Input
              name="workPlace"
              value={watch('workPlace')}
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepOne.placeWorkPlaceholder',
              )}
              inputStyle={...{ ...styles.input, ...shareStyles.marginDefault }}
              rules={RequiredValidation}
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            />
          </View>

          <View style={shareStyles.separateBar} />

          <View
            style={[
              shareStyles.defaultPaddingTop,
              shareStyles.defaultPaddingHorizontal,
            ]}
          >
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[styles.nextButton]}
            >
              <Text bold="bold" color="white">
                {i18n.t('features.vaccineRegistrationScreen.stepOne.continue')}
              </Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
}

export default memo(StepOne);
