import React, { memo } from 'react';
import { ScrollView, View, TouchableOpacity, ViewStyle } from 'react-native';
import moment from 'moment';
import Text from '../../../../components/Text';
import styles from './styles.css';
import shareStyles from '../shareStyles.css';
import Image from '../../../../components/Image';
import { applicationDimensions } from '../../../../../style.css';
import i18n from '../../../../i18n';
import DateUtils from '../../../../utils/date';
import {
  ResidentFormDataType,
  VerificationType,
} from '../../../../services/api/types/ecoid';
import { AreaType } from '../../../../services/api/types/directEcoid';
import { StepOneFormParams } from '../StepOne';
import { StepTwoFormParams } from '../StepTwo';
import { ImageType } from '../../types';
import { LanguageType } from '../../../User/reducers';

interface Props {
  onPressPrevious: () => void;
  onPressContinue: () => void;
  stepOneFormParams: StepOneFormParams | undefined;
  stepTwoFormParams: StepTwoFormParams | undefined;
  resident: ResidentFormDataType;
  areaData: AreaType;
  userLanguage?: LanguageType;
  onImagePreviewPress: (photoUrl: string) => void;
}

interface PropsRowInfo {
  label: string;
  value?: string;
  style?: ViewStyle;
  urlImages?: string[];
  onImagePreviewPress?: (photoUrl: string) => void;
}

function renderImages(
  uris: string[],
  onImagePreviewPress?: (photoUrl: string) => void,
) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '50%',
        justifyContent: 'flex-end',
      }}
    >
      {uris.map(uri => {
        return (
          <TouchableOpacity
            onPress={() => onImagePreviewPress && onImagePreviewPress(uri)}
          >
            <Image uri={uri} style={styles.imageCMT} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function RowInfo(props: PropsRowInfo) {
  const { label, value, style, urlImages, onImagePreviewPress } = props;
  return (
    <View style={[styles.rowInfo, shareStyles.marginDefault, style]}>
      <Text color="grey" style={styles.rowInfoLeft}>
        {label}
      </Text>
      {urlImages ? (
        renderImages(urlImages, onImagePreviewPress)
      ) : (
        <Text style={styles.rowInfoRight}>{value || ''}</Text>
      )}
    </View>
  );
}

function StepThree(props: Props) {
  const {
    onPressPrevious,
    onPressContinue,
    stepOneFormParams,
    stepTwoFormParams,
    areaData,
    resident,
    userLanguage,
    onImagePreviewPress,
  } = props;
  const typeOfDocument: VerificationType = getFieldValue(
    stepOneFormParams,
    'verificationType',
  );

  function mapProvide(provinceId: number | undefined) {
    if (!provinceId || !areaData || !areaData.province) {
      return '-';
    }

    const province = areaData.province.find(p => p.provinceId === provinceId);
    return province?.name || '-';
  }

  function mapCountry(countryId: number | undefined) {
    if (!countryId || !resident.countries) {
      return '-';
    }

    const country = resident.countries.find(c => c.countryId === countryId);
    return country?.name;
  }

  function mapDistrict(districtId: number | undefined) {
    if (!districtId || !areaData || !areaData.district) {
      return '-';
    }

    const district = areaData.district.find(d => d.districtId === districtId);
    return district?.name || '-';
  }

  function mapCommune(communeId: number) {
    if (!communeId || !areaData || !areaData.commune) {
      return '-';
    }

    const commune = areaData.commune.find(c => c.communeId === communeId);
    return commune?.name || '-';
  }

  function mapRelationships(relationshipId: number | undefined) {
    if (!relationshipId || !resident.relationships) {
      return '-';
    }

    const relationship = resident.relationships.find(
      r => r.relationshipId === relationshipId,
    );
    return userLanguage === 'vn'
      ? relationship?.relationshipName
      : relationship?.relationshipNameEn;
  }

  function mapStayStatusCode() {
    if (!stepTwoFormParams || !stepTwoFormParams.stayStatusCode) {
      return '-';
    }
    const stayStatusCode = resident.stayStatus?.find(
      status => status.stayStatusCode === stepTwoFormParams.stayStatusCode,
    );
    return userLanguage === 'vn'
      ? stayStatusCode?.name
      : stayStatusCode?.nameEn;
  }

  function mapImageForm(images: ImageType[]) {
    if (!images || !Array.isArray(images)) {
      return [];
    }

    return images.map(item => item.uri);
  }

  function getFieldValue(data: any, field: string, placeholder = '-') {
    if (!data || !data[field]) {
      return placeholder;
    }

    return data[field];
  }

  function mapFormContent() {
    switch (typeOfDocument) {
      case 'IDENTITY':
        return i18n.t(
          'features.vaccineRegistrationScreen.stepOne.identityCard',
        );
      case 'PASSPORT':
        return i18n.t('features.vaccineRegistrationScreen.stepOne.passport');
      case 'BIRTH_CERTIFICATE':
        return i18n.t(
          'features.vaccineRegistrationScreen.stepOne.birthCertificate',
        );
      default:
        return '-';
    }
  }

  return (
    <ScrollView
      style={styles.formContainer}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          {
            marginHorizontal: 16,
          },
        ]}
      >
        <View style={shareStyles.marginDefault}>
          <Text bold="bold" fontSize="large" style={{ marginBottom: 8 }}>
            {i18n.t('features.vaccineRegistrationScreen.stepThere.title')}
          </Text>
          <Text color="grey">
            {i18n.t('features.vaccineRegistrationScreen.stepOne.description')}
          </Text>
        </View>

        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepOne.fullName')}
          value={getFieldValue(stepOneFormParams, 'fullName')}
        />
        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepOne.birthday')}
          value={
            stepOneFormParams &&
            moment(stepOneFormParams.birthday)
              .format(DateUtils.MOMENT_FORMATS.FULL_DATE)
              .toString()
          }
        />
        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepOne.gender')}
          value={
            getFieldValue(stepOneFormParams, 'gender', '1') === '1'
              ? 'Nam'
              : 'Nữ'
          }
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.phoneNumber',
          )}
          value={getFieldValue(stepOneFormParams, 'phoneNumber')}
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.insurrance',
          )}
          value={getFieldValue(stepOneFormParams, 'insuranceNumber')}
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.verificationType',
          )}
          value={mapFormContent()}
        />

        <View style={[shareStyles.marginDefault, shareStyles.content]}>
          <RowInfo
            label={i18n.t(
              'features.vaccineRegistrationScreen.stepOne.verificationType',
            )}
            value={mapFormContent()}
          />

          {typeOfDocument === 'IDENTITY' && (
            <>
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.identityNumber',
                )}
                value={getFieldValue(stepOneFormParams, 'identityNumber')}
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.identityIssueDate',
                )}
                value={
                  stepOneFormParams &&
                  moment(stepOneFormParams.identityIssueDate)
                    .format(DateUtils.MOMENT_FORMATS.FULL_DATE)
                    .toString()
                }
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.identityIssuePlace',
                )}
                value={getFieldValue(stepOneFormParams, 'identityIssuePlace')}
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.imageIdentityNumber',
                )}
                urlImages={mapImageForm([
                  (stepOneFormParams &&
                    stepOneFormParams.identityScanFront) || {
                    uri: '',
                    sgid: '',
                  },
                  (stepOneFormParams && stepOneFormParams.identityScanBack) || {
                    uri: '',
                    sgid: '',
                  },
                ])}
                style={{
                  marginBottom: 0,
                }}
                onImagePreviewPress={onImagePreviewPress}
              />
            </>
          )}

          {typeOfDocument === 'PASSPORT' && (
            <>
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.passportNumber',
                )}
                value={getFieldValue(stepOneFormParams, 'passportNumber')}
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.passportSignDate',
                )}
                value={
                  stepOneFormParams &&
                  moment(stepOneFormParams.passportSignDate)
                    .format(DateUtils.MOMENT_FORMATS.FULL_DATE)
                    .toString()
                }
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.passportExpiryDate',
                )}
                value={
                  stepOneFormParams &&
                  moment(stepOneFormParams.passportExpiryDate)
                    .format(DateUtils.MOMENT_FORMATS.FULL_DATE)
                    .toString()
                }
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.country',
                )}
                value={mapCountry(
                  getFieldValue(stepOneFormParams, 'countryId'),
                )}
              />
              <RowInfo
                label={i18n.t(
                  'features.vaccineRegistrationScreen.stepOne.passportScanTitle',
                )}
                urlImages={mapImageForm([
                  (stepOneFormParams && stepOneFormParams.passportScan) || {
                    uri: '',
                    sgid: '',
                  },
                ])}
                style={{
                  marginBottom: 0,
                }}
                onImagePreviewPress={onImagePreviewPress}
              />
            </>
          )}

          {typeOfDocument === 'BIRTH_CERTIFICATE' && (
            <RowInfo
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepOne.birthCertificateScan',
              )}
              urlImages={mapImageForm([
                (stepOneFormParams &&
                  stepOneFormParams.birthCertificateScan) || {
                  uri: '',
                  sgid: '',
                },
              ])}
              style={{
                marginBottom: 0,
              }}
              onImagePreviewPress={onImagePreviewPress}
            />
          )}
        </View>
      </View>
      <View style={shareStyles.separateBar} />

      <View
        style={{
          marginHorizontal: applicationDimensions.defaultPadding,
          paddingVertical: applicationDimensions.defaultPadding,
        }}
      >
        {typeOfDocument === 'IDENTITY' && (
          <>
            <RowInfo
              label={i18n.t('features.vaccineRegistrationScreen.stepOne.city')}
              value={mapProvide(
                getFieldValue(stepOneFormParams, 'provinceId', undefined),
              )}
            />
            <RowInfo
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepOne.district',
              )}
              value={mapDistrict(
                getFieldValue(stepOneFormParams, 'districtId', undefined),
              )}
            />
            <RowInfo
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepOne.commune',
              )}
              value={mapCommune(
                getFieldValue(stepOneFormParams, 'communeId', undefined),
              )}
            />
            <RowInfo
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepOne.province',
              )}
              value={getFieldValue(stepOneFormParams, 'village')}
            />
          </>
        )}

        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepOne.career')}
          value={getFieldValue(stepOneFormParams, 'career')}
        />
        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepOne.placeWork')}
          value={getFieldValue(stepOneFormParams, 'workPlace')}
          style={{
            marginBottom: 0,
          }}
        />
      </View>

      <View style={shareStyles.separateBar} />
      <View
        style={{
          marginHorizontal: applicationDimensions.defaultPadding,
          paddingVertical: applicationDimensions.defaultPadding,
        }}
      >
        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepTwo.stay')}
          value={`${resident.locationCode} - ${resident.areaName}`}
        />
        <RowInfo
          label={i18n.t('features.vaccineRegistrationScreen.stepTwo.owner')}
          value={`${resident.ownerName}`}
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepTwo.relationship',
          )}
          value={mapRelationships(
            getFieldValue(stepTwoFormParams, 'relationshipId', undefined),
          )}
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepTwo.tempLeaveFromDate',
          )}
          value={
            stepTwoFormParams &&
            moment(stepTwoFormParams.tempLeaveFromDate)
              .format(DateUtils.MOMENT_FORMATS.FULL_DATE)
              .toString()
          }
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepTwo.stayStatusCode',
          )}
          value={mapStayStatusCode()}
        />
        <RowInfo
          label={i18n.t(
            'features.vaccineRegistrationScreen.stepTwo.otherScanTitle',
          )}
          urlImages={mapImageForm(
            getFieldValue(stepTwoFormParams, 'otherScan', undefined),
          )}
          style={{
            marginBottom: 0,
          }}
          onImagePreviewPress={onImagePreviewPress}
        />
      </View>
      <View style={shareStyles.separateBar} />

      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onPressPrevious} style={styles.button}>
          <Text bold="bold" color="white" style={styles.buttonText}>
            {i18n.t('features.vaccineRegistrationScreen.stepTwo.back')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressContinue}
          style={[styles.button, styles.primaryButton]}
        >
          <Text bold="bold" color="white">
            {i18n.t('features.vaccineRegistrationScreen.stepOne.continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

StepThree.defaultProps = {
  stepOneFormParams: {},
  stepTwoFormParams: {},
};

export default memo(StepThree);
