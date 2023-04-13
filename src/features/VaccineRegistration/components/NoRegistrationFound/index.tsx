import React from 'react';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import NotFoundImage from '../../../../assets/images/not_found_v2.svg';
import styles from './style.css';
import i18n from '../../../../i18n';

export default function NoRegistrationFound() {
  return (
    <View style={styles.container}>
      <NotFoundImage style={styles.image} />
      <Text style={styles.details} color="grey">
        {i18n.t('features.vaccineRegistrationList.not_found')}
      </Text>
    </View>
  );
}
