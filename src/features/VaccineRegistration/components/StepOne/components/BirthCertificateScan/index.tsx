import React from 'react';
import { View } from 'react-native';
import shareStyle from '../styles.css';
import Text from '../../../../../../components/Text';
import styles from './styles.css';
import SingleImagePicker from '../../../SingleImagePicker';
import { AttachmentType } from '../../../../../../components/AttachmentList/components/Attachment';
import i18n from '../../../../../../i18n';

interface PropsType {
  watch: any;
  setValue: any;
  errors: any;
  onImagePreviewPress: (photoUrl: string) => void;
}

export default function BirthCertificateScan(props: PropsType) {
  const { watch, setValue, errors, onImagePreviewPress } = props;
  const birthCertificateScan = watch('birthCertificateScan');

  function handleUploadImage(attachment: AttachmentType) {
    setValue('birthCertificateScan', {
      uri: attachment.uri,
      sgid: attachment.sgid,
    });
  }

  function handleDeleteImage() {
    setValue('birthCertificateScan', undefined);
  }

  return (
    <View
      style={[shareStyle.marginDefault, shareStyle.content, styles.content]}
    >
      <Text key="birthCertificateScanLabel" bold="bold">
        {i18n.t(
          'features.vaccineRegistrationScreen.stepOne.birthCertificateScan',
        )}
      </Text>
      <Text color="grey" style={styles.detailsText}>
        {i18n.t(
          'features.vaccineRegistrationScreen.stepOne.birthCertificateScanDesc',
        )}
      </Text>
      <View style={styles.imageGroup}>
        <SingleImagePicker
          name="birthCertificateScan"
          onImageAdded={handleUploadImage}
          uri={birthCertificateScan?.uri}
          textPlaceholder={i18n.t(
            'features.vaccineRegistrationScreen.stepOne.passportScan',
          )}
          onDeleteImage={handleDeleteImage}
          error={errors?.birthCertificateScan}
          onImagePreviewPress={onImagePreviewPress}
        />
      </View>
    </View>
  );
}
