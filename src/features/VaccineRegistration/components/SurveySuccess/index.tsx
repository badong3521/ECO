import React from 'react';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import styles from './style.css';
import Button from '../../../../components/Button';
import IconSuccess from '../../../../assets/vaccine/ic_success.svg';
import shareStyle from '../shareStyles.css';
import i18n from '../../../../i18n';
import VaccineRegistrationModal from '../UserSelectionModal';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SurveySuccessModal(props: Props) {
  const { visible, onClose } = props;

  return (
    <VaccineRegistrationModal
      visible={visible}
      title={i18n.t('features.afterInjectionUpdate.surveySuccess.header')}
      onClose={onClose}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <IconSuccess style={styles.icon} />
        <Text fontSize="large" bold="semiBold" style={shareStyle.marginDefault}>
          {i18n.t('features.afterInjectionUpdate.surveySuccess.title')}
        </Text>
        <Text color="grey" style={styles.description}>
          {i18n.t('features.afterInjectionUpdate.surveySuccess.description')}
        </Text>
        <Button
          style={styles.button}
          uppercase={false}
          title={i18n.t('features.afterInjectionUpdate.surveySuccess.button')}
          type="primary"
          onPress={onClose}
        />
      </View>
    </VaccineRegistrationModal>
  );
}
