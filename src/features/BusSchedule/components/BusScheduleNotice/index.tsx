import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../components/Text';

interface BusScheduleNoticeProps {
  notice: string;
}

export default function BusScheduleNotice(props: BusScheduleNoticeProps) {
  const i18n = useTranslation();
  const { notice } = props;
  return (
    <View style={styles.container}>
      <Text bold="bold" style={styles.title}>
        {i18n.t('features.busScheduleScreen.notice')}
      </Text>
      <Text fontSize="small" style={styles.notice}>
        {notice}
      </Text>
    </View>
  );
}
