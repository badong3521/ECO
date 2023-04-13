import React from 'react';
import { View } from 'react-native';
import Text from '../../../../components/Text';
import NotFoundImage from '../../../../assets/images/search_not_found_v1.svg';
import styles from './style.css';
import i18n from '../../../../i18n';

export default function NoResidentFound() {
  return (
    <View style={styles.container}>
      <NotFoundImage style={styles.image} />
      <Text bold="bold" style={styles.header}>
        {i18n.t('components.noResidentFound.title')}
      </Text>
      <Text style={styles.details} color="grey">
        {i18n.t('components.noResidentFound.description')}
      </Text>
    </View>
  );
}
