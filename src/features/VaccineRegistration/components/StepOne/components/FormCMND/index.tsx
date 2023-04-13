import React from 'react';
import { View } from 'react-native';
import Text from '../../../../../../components/Text';
import Input from '../../../Input';
import styles from './styles.css';
import shareStyle from '../styles.css';
import DatePicker from '../../../DatePicker';
import SingleImagePicker from '../../../SingleImagePicker';
import i18n from '../../../../../../i18n';

interface PropsType {
  watch: any;
  setValue: any;
  errors: any;
  onImagePreviewPress: (photoUrl: string) => void;
}

const currentDate = new Date();

export default function FormCMND(props: PropsType) {
  const { watch, setValue, errors, onImagePreviewPress } = props;

  const identityScanFront = watch('identityScanFront');
  const identityScanBack = watch('identityScanBack');

  function handleUploadImage(data: any) {
    setValue(data.type, {
      uri: data.uri,
      sgid: data.sgid,
    });
  }

  function handleDeleteImage(type: string) {
    setValue(type, undefined);
  }

  return (
    <View style={[shareStyle.marginDefault, shareStyle.content]}>
      <Text key="identityNumberLabel" bold="bold">
        {i18n.t('features.vaccineRegistrationScreen.stepOne.identityNumber')}
      </Text>
      <Input
        name="identityNumber"
        value={watch('identityNumber')}
        onChangeText={value => setValue('identityNumber', value)}
        inputStyle={...{ ...shareStyle.marginDefault, ...styles.input }}
        errorMessage={errors?.identityNumber?.type}
        keyboardType="numeric"
      />

      <Text key="identityIssueDateLabel" bold="bold">
        {i18n.t('features.vaccineRegistrationScreen.stepOne.identityIssueDate')}
      </Text>
      <DatePicker
        name="identityIssueDate"
        value={watch('identityIssueDate')}
        onValueChange={value => setValue('identityIssueDate', value)}
        errorMessage={errors?.identityIssueDate?.type}
        maxDate={
          new Date(
            currentDate.getFullYear() + 8,
            currentDate.getMonth(),
            currentDate.getDate(),
          )
        }
      />

      <Text key="identityIssuePlaceLable" bold="bold">
        {i18n.t(
          'features.vaccineRegistrationScreen.stepOne.identityIssuePlace',
        )}
      </Text>
      <Input
        name="identityIssuePlace"
        value={watch('identityIssuePlace')}
        onChangeText={value => setValue('identityIssuePlace', value)}
        inputStyle={...{ ...shareStyle.marginDefault, ...styles.input }}
        errorMessage={errors?.identityIssuePlace?.type}
      />

      <Text bold="bold">
        {i18n.t(
          'features.vaccineRegistrationScreen.stepOne.imageIdentityNumber',
        )}
      </Text>
      <Text color="grey" style={styles.fullNameLabel}>
        {i18n.t(
          'features.vaccineRegistrationScreen.stepOne.imageIdentityNumberDesc',
        )}
      </Text>
      <View style={styles.imageGroup}>
        <SingleImagePicker
          name="identityScanFront"
          onImageAdded={attachment =>
            handleUploadImage({
              type: 'identityScanFront',
              ...attachment,
            })
          }
          uri={identityScanFront?.uri}
          textPlaceholder={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.frontImageidentityNumber',
          )}
          onDeleteImage={() => handleDeleteImage('identityScanFront')}
          error={errors?.identityScanFront}
          onImagePreviewPress={onImagePreviewPress}
        />

        <SingleImagePicker
          name="identityScanBack"
          onImageAdded={attachment =>
            handleUploadImage({
              type: 'identityScanBack',
              ...attachment,
            })
          }
          uri={identityScanBack?.uri}
          textPlaceholder={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.backImageidentityNumber',
          )}
          onDeleteImage={() => handleDeleteImage('identityScanBack')}
          error={errors?.identityScanBack}
          onImagePreviewPress={onImagePreviewPress}
        />
      </View>
    </View>
  );
}
