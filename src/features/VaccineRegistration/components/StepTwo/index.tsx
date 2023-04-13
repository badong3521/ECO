import React, { memo, useEffect } from 'react';
import { useForm, ValidationRules } from 'react-hook-form';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Form from '../../../../components/Form';
import Text from '../../../../components/Text';
import Input from '../../../../components/Input';
import RequiredValidation from '../../../../components/Form/validators';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';

import useAttachments from '../../../../utils/hooks/useAttachments';
import ImagePlaceholder from '../ImagePlaceholder';
import { AttachmentType } from '../../../../components/AttachmentList/components/Attachment';
import Image from '../../../../components/Image';
import DeleteButton from '../DeleteButton';
import ItemRadioButton from '../ItemRadioButton';
import i18n from '../../../../i18n';
import { ResidentFormDataType } from '../../../../services/api/types/ecoid';
import { LanguageType } from '../../../User/reducers';
import { ImageType } from '../../types';
import { urlToImageType } from '../../../../utils/userFormData';

import styles from './styles.css';
import shareStyles from '../shareStyles.css';

interface Props {
  resident: ResidentFormDataType;
  onPressPrevious: () => void;
  onPressContinue: (params: StepTwoFormParams) => void;
  userLanguage?: LanguageType;
  onImagePreviewPress: (photoUrl: string) => void;
}

export interface StepTwoFormParams {
  relationshipId: number;
  tempLeaveFromDate: Date;
  stayStatusCode: string;
  otherScan: ImageType[];
}

const PLACEHOLDER_TEXT_COLOR = '#A7ABC3';
const COLOR_LINK = '#1990FF';
const currentDate = new Date();

interface UploadImageProps {
  name?: string;
  onUploadImage: () => void;
  onDeleteImage: (image: AttachmentType) => void;
  loading: boolean | undefined;
  images: AttachmentType[];
  error?: any;
  rules?: ValidationRules;
  uploadLimit?: number;
  onImagePreviewPress: (photoUrl: string) => void;
}

function UploadImageComponent(props: UploadImageProps) {
  const {
    onUploadImage,
    onDeleteImage,
    loading,
    images = [],
    error,
    onImagePreviewPress,
    uploadLimit = 3,
  } = props;

  function renderPickerImage() {
    if (images && images.length >= uploadLimit) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={onUploadImage}
        style={[
          shareStyles.imageContainer,
          styles.imageContainer,
          error && styles.imageError,
        ]}
      >
        {loading ? (
          <ActivityIndicator animating />
        ) : (
          <ImagePlaceholder
            textPlaceholder={i18n.t(
              'features.vaccineRegistrationScreen.stepOne.passportScan',
            )}
          />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.imageGroup}>
        {images.map(image => {
          const canDelete = image.uri!!;

          return (
            <TouchableOpacity
              key={image.sgid}
              style={[shareStyles.imageContainer, styles.imageContainer]}
              onPress={() => onImagePreviewPress(image.uri!)}
            >
              <Image style={styles.image} uri={image.uri!} />
              {canDelete && (
                <DeleteButton onPress={() => onDeleteImage(image)} />
              )}
            </TouchableOpacity>
          );
        })}
        {renderPickerImage()}
      </View>
    </>
  );
}

const uploadLimit = 3;

function StepTwo(props: Props) {
  const {
    resident,
    onPressPrevious,
    onPressContinue,
    userLanguage,
    onImagePreviewPress,
  } = props;
  const {
    errors,
    setValue,
    register,
    handleSubmit,
    watch,
    getValues,
  } = useForm<StepTwoFormParams>({
    defaultValues: {
      relationshipId: resident.relationshipId,
      stayStatusCode: resident.stayStatusCode?.toString(),
      tempLeaveFromDate: resident.tempLeaveFromDate
        ? new Date(resident.tempLeaveFromDate)
        : undefined,
    },
  });

  const {
    removeAttachment,
    onUploadImage,
    images,
    uploadingImage,
  } = useAttachments({
    onAttachmentAdded,
    onAttachmentRemoved,
    uploadLimit,
    mixFileAndImage: false,
    onLoadImages: resident.otherScan
      ? resident.otherScan.map(uri => {
          return {
            ...urlToImageType(uri),
            name: 'name',
            mime: 'mine',
          };
        })
      : [],
  });

  function onAttachmentAdded(attachment: AttachmentType) {
    const oldOtherScan: ImageType[] = getValues('otherScan') || [];

    setValue('otherScan', [
      ...oldOtherScan,
      { sgid: attachment.sgid!, uri: attachment.uri! },
    ]);
  }

  function onAttachmentRemoved(attachment: AttachmentType) {
    const otherScan: ImageType[] = getValues('otherScan');

    if (otherScan && otherScan.length === 1) {
      setValue('otherScan', undefined);
    } else {
      setValue(
        'otherScan',
        otherScan.filter(item => {
          return item.sgid !== attachment.sgid;
        }),
      );
    }
  }

  function onSubmit(params: StepTwoFormParams) {
    onPressContinue(params);
  }

  function isChecked(fieldName: string, id: string) {
    const value = watch(fieldName);
    return value && value === id ? 'checked' : 'unchecked';
  }

  useEffect(() => {
    register('otherScan', RequiredValidation);
  });

  useEffect(() => {
    if (resident.otherScan) {
      const imageFiles = resident.otherScan.map(uri => urlToImageType(uri));
      setValue('otherScan', imageFiles);
    }
  }, [resident.otherScan]);

  return (
    <ScrollView
      style={styles.formContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={shareStyles.marginDefault}>
        <Form register={register} errors={errors} setValue={setValue}>
          <View style={shareStyles.marginDefault}>
            <Text bold="bold" fontSize="large" style={{ marginBottom: 8 }}>
              {i18n.t('features.vaccineRegistrationScreen.stepTwo.title')}
            </Text>
            <Text color="grey">
              {i18n.t('features.vaccineRegistrationScreen.stepOne.description')}
            </Text>
          </View>

          <Text key="stayLabel" bold="bold">
            {i18n.t('features.vaccineRegistrationScreen.stepTwo.stay')}
          </Text>
          <Input
            disabled
            inputStyle={...{ ...styles.input, ...shareStyles.marginDefault }}
            value={`${resident.locationCode} - ${resident.areaName}`}
          />

          <Text key="ownerLabel" bold="bold">
            {i18n.t('features.vaccineRegistrationScreen.stepTwo.owner')}
          </Text>
          <Input
            disabled
            inputStyle={...{ ...styles.input, ...shareStyles.marginDefault }}
            value={`${resident.ownerName}`}
          />

          <Text key="relationshipIdLabel" bold="bold">
            {i18n.t('features.vaccineRegistrationScreen.stepTwo.relationship')}
          </Text>
          <View style={shareStyles.marginDefault}>
            <Dropdown
              data={resident.relationships || []}
              value={watch('relationshipId')}
              name="relationshipId"
              placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
              rules={RequiredValidation}
              type="round"
              style={styles.input}
              label={i18n.t(
                'features.vaccineRegistrationScreen.stepTwo.relationshipPlaceholder',
              )}
              valueExtractor={value => value.relationshipId}
              labelExtractor={value => {
                return userLanguage === 'vn'
                  ? value.relationshipName
                  : value.relationshipNameEn;
              }}
              itemCount={7}
            />
          </View>

          <Text key="tempLeaveFromDateLabel" bold="bold">
            {i18n.t(
              'features.vaccineRegistrationScreen.stepTwo.tempLeaveFromDate',
            )}
          </Text>
          <DatePicker
            name="tempLeaveFromDate"
            value={watch('tempLeaveFromDate')}
            onValueChange={value => setValue('tempLeaveFromDate', value)}
            rules={RequiredValidation}
            maxDate={
              new Date(
                currentDate.getFullYear() + 8,
                currentDate.getMonth(),
                currentDate.getDate(),
              )
            }
          />

          <Text key="stayStatusCodeLabel" bold="bold">
            {i18n.t(
              'features.vaccineRegistrationScreen.stepTwo.stayStatusCode',
            )}
          </Text>

          <View style={shareStyles.marginDefault}>
            {resident.stayStatus?.map(status => (
              <View key={status.stayStatusCode} style={styles.itemRadio}>
                <ItemRadioButton
                  name="stayStatusCode"
                  value={status.stayStatusCode}
                  status={isChecked('stayStatusCode', status.stayStatusCode)}
                  tintColor={COLOR_LINK}
                  onPress={() =>
                    setValue('stayStatusCode', status.stayStatusCode)
                  }
                  style={styles.radioButton}
                  label={userLanguage === 'vn' ? status.name : status.nameEn}
                />
              </View>
            ))}
          </View>

          <Text key="otherScanLabel" bold="bold">
            {i18n.t(
              'features.vaccineRegistrationScreen.stepTwo.otherScanTitle',
            )}
          </Text>
          <Text color="grey" style={styles.otherScanDesc}>
            {i18n.t('features.vaccineRegistrationScreen.stepTwo.otherScanDesc')}
          </Text>
          <UploadImageComponent
            onUploadImage={onUploadImage}
            onDeleteImage={removeAttachment}
            loading={uploadingImage}
            images={images}
            uploadLimit={uploadLimit}
            error={errors.otherScan}
            onImagePreviewPress={onImagePreviewPress}
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={onPressPrevious} style={styles.button}>
              <Text bold="bold" color="white" style={styles.buttonText}>
                {i18n.t('features.vaccineRegistrationScreen.stepTwo.back')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[styles.button, styles.primaryButton]}
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

export default memo(StepTwo);
