import React from 'react';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import ProcessingImage from '../../../../assets/images/processing.svg';
import i18n from '../../../../i18n';

import styles from './styles.css';

interface PropsType {
  onClose: () => void;
}

export default function RegistrationExpired(props: PropsType) {
  const { onClose } = props;

  return (
    <View style={styles.container}>
      <ProcessingImage style={styles.image} />
      <Text bold="bold" style={styles.header}>
        {i18n.t('features.vaccineRegistrationExpired.header')}
      </Text>
      <Text style={styles.details} color="grey">
        {i18n.t('features.vaccineRegistrationExpired.details')}
      </Text>
      <Button
        type="primary"
        title={i18n.t('actions.understand')}
        onPress={onClose}
        style={styles.button}
      />
    </View>
  );
}
