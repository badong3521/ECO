import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Text from '../../../../components/Text';
import styles from './styles.css';
import i18n from '../../../../i18n';

const EmptyTicketsResolvedSvg = require('../../../../assets/helpDesk/png/create_success_logo.png');

interface Props {
  onPressContinue: () => void;
}

function StepFour(props: Props) {
  const { onPressContinue } = props;

  return (
    <View style={styles.container}>
      <Text bold="bold" fontSize="large" style={styles.textHeader}>
        {i18n.t('features.vaccineRegistrationScreen.stepFour.title')}
      </Text>
      <FastImage style={styles.image} source={EmptyTicketsResolvedSvg} />
      <Text color="grey" style={styles.content}>
        {i18n.t('features.vaccineRegistrationScreen.stepFour.description')}
      </Text>

      <TouchableOpacity onPress={onPressContinue} style={styles.nextButton}>
        <Text bold="bold" color="white">
          {i18n.t('features.vaccineRegistrationScreen.stepFour.goToHome')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(StepFour);
