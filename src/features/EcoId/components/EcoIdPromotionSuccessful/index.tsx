import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import { applicationColors } from '../../../../../style.css';
import useStatusBar from '../../../../utils/hooks/useStatusBar';

const SUCCESSFUL_IMAGE = require('../../../../assets/ecoid/png/success_promotion.png');

interface EcoIdSuccessfulScreenProps {
  navigation: any;
}

export default function EcoIdPromotionSuccessfulScreen(
  props: EcoIdSuccessfulScreenProps,
) {
  const { navigation } = props;
  const i18n = useTranslation();
  const { onButtonPress } = navigation.state.params;

  function onStartPress() {
    if (onButtonPress) {
      onButtonPress();
    }
  }

  useStatusBar('dark-content');

  return (
    <View style={styles.root}>
      <FastImage source={SUCCESSFUL_IMAGE} style={styles.image} />
      <Text bold="bold" style={styles.title}>
        {i18n.t('features.ecoId.ecoIdPaymentScreen.promotion.title')}
      </Text>
      <Text style={styles.desc}>
        {i18n.t('features.ecoId.ecoIdPaymentScreen.promotion.desc')}
      </Text>
      <Button
        uppercase={false}
        color={applicationColors.semantic.info.shade500}
        style={styles.button}
        type="primary"
        title={i18n.t('features.ecoId.ecoIdPaymentScreen.promotion.button')}
        onPress={onStartPress}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
}
