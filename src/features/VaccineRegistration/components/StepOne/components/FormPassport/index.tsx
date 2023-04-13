import React from 'react';
import { View } from 'react-native';
import shareStyle from '../styles.css';
import Text from '../../../../../../components/Text';
import Input from '../../../Input';
import DatePicker from '../../../DatePicker';
import styles from './styles.css';
import shareStyles from '../../../shareStyles.css';
import Dropdown from '../../../Dropdown';
import SingleImagePicker from '../../../SingleImagePicker';
import { AttachmentType } from '../../../../../../components/AttachmentList/components/Attachment';
import { ResidentCountryType } from '../../../../../../services/api/types/ecoid';
import i18n from '../../../../../../i18n';

const PLACEHOLDER_TEXT_COLOR = '#A7ABC3';

interface PropsType {
  watch: any;
  setValue: any;
  countries?: ResidentCountryType[];
  errors?: any;
  onImagePreviewPress: (photoUrl: string) => void;
}

const currentDate = new Date();

export default function FormPassport(props: PropsType) {
  const {
    watch,
    setValue,
    errors,
    onImagePreviewPress,
    countries = [],
  } = props;
  const passportScan = watch('passportScan');

  function handleUploadImage(attachment: AttachmentType) {
    setValue('passportScan', {
      uri: attachment.uri,
      sgid: attachment.sgid,
    });
  }

  function handleDeleteImage() {
    setValue('passportScan', undefined);
  }

  return (
    <View
      style={[shareStyle.marginDefault, shareStyle.content, styles.content]}
    >
      <Text key="passportNumberLabel" bold="bold">
        {i18n.t('features.vaccineRegistrationScreen.stepOne.passportNumber')}
      </Text>

      <Input
        name="passportNumber"
        value={watch('passportNumber')}
        onChangeText={value => setValue('passportNumber', value)}
        inputStyle={...{ ...shareStyle.marginDefault, ...styles.input }}
        errorMessage={errors?.passportNumber?.type}
      />

      <Text key="passportSignDateLabel" bold="bold">
        {i18n.t('features.vaccineRegistrationScreen.stepOne.passportSignDate')}
      </Text>
      <DatePicker
        name="passportSignDate"
        value={watch('passportSignDate')}
        onValueChange={value => setValue('passportSignDate', value)}
        errorMessage={errors?.passportSignDate}
        maxDate={
          new Date(
            currentDate.getFullYear() + 8,
            currentDate.getMonth(),
            currentDate.getDate(),
          )
        }
      />

      <Text key="passportExpiryDateLabel" bold="bold">
        {i18n.t(
          'features.vaccineRegistrationScreen.stepOne.passportExpiryDate',
        )}
      </Text>
      <DatePicker
        name="passportExpiryDate"
        value={watch('passportExpiryDate')}
        onValueChange={value => setValue('passportExpiryDate', value)}
        errorMessage={errors?.passportExpiryDate}
      />

      <Text key="countryIdLabel" bold="bold" style={styles.labelInput}>
        {i18n.t('features.vaccineRegistrationScreen.stepOne.country')}
      </Text>
      <View style={shareStyles.marginDefault}>
        <Dropdown
          data={countries || []}
          style={styles.containerDropdown}
          name="countryId"
          label=""
          type="round"
          placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
          value={watch('countryId')}
          valueExtractor={value => value.countryId}
          labelExtractor={value => value.name}
          onChangeText={value => setValue('countryId', value)}
          errorMessage={errors?.countryId?.type}
        />
      </View>

      <Text key="passportScan" bold="bold">
        {i18n.t('features.vaccineRegistrationScreen.stepOne.passportScanTitle')}
      </Text>
      <Text
        color="grey"
        style={{
          marginBottom: 8,
        }}
      >
        {i18n.t('features.vaccineRegistrationScreen.stepOne.passportScanDesc')}
      </Text>
      <View style={styles.imageGroup}>
        <SingleImagePicker
          name="passportScan"
          onImageAdded={handleUploadImage}
          uri={passportScan?.uri}
          textPlaceholder={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.passportScan',
          )}
          onDeleteImage={handleDeleteImage}
          error={errors?.passportScan}
          onImagePreviewPress={onImagePreviewPress}
        />
      </View>
    </View>
  );
}
