import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './style.css';
import TouchableComponent from '../../../../components/TouchableComponent';
import EcofeedbackIcon from '../../../../assets/profile/ic_ecofeedback.svg';
import Text from '../../../../components/Text';
import IconComponent from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';

interface EcofeedbackBannerProps {
  onPress: () => void;
}

// Banner will link to the ecoId screen
export default function EcofeedbackBanner(props: EcofeedbackBannerProps) {
  const { onPress } = props;
  const { i18n } = useTranslation();
  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.root}>
        <EcofeedbackIcon />
        <View style={styles.content}>
          <Text color="darkGrey" bold="bold">
            {i18n.t('features.userScreen.ecofeedback')}
          </Text>
          <Text fontSize="small" color="darkGrey" style={styles.description}>
            {i18n.t('features.userScreen.ecofeedbackDesc')}
          </Text>

          <View style={styles.sendFeedbackContainer}>
            <Text bold="bold" style={styles.sendFeedbackButton}>
              {i18n.t('features.userScreen.sendFeedback')}
            </Text>
            <IconComponent
              size={applicationDimensions.iconSize}
              name={applicationIcons.arrowRight}
              color={applicationColors.secondary.shade500}
              iconPack="feather"
            />
          </View>
        </View>
      </View>
    </TouchableComponent>
  );
}
