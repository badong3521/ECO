import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import IconComponent from '../../../../components/Icon';
import Text from '../../../../components/Text';
import { StopStyleType } from '../../../Bus/types';
import styles from './style.css';

export default function BusStopTypes() {
  const i18n = useTranslation();

  function renderType(type: any) {
    return (
      <View style={styles.stopType} key={type.icon}>
        <IconComponent
          style={styles.stopTypeIcon}
          size={15}
          name={type.icon}
          color={type.color}
        />
        <Text fontSize="tiny" style={{ color: type.color }}>
          {i18n.t(type.name)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.stopTypes}>
      {Array.from(StopStyleType.values()).map(value => renderType(value))}
    </View>
  );
}
