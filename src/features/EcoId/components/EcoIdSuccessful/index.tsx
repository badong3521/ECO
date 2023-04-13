import React from 'react';
import { View } from 'react-native';
import BackgroundImage from '../../../../assets/ecoid/svg/onboardingBackground.svg';
import SyncSuccessfulIcon from '../../../../assets/ecoid/svg/ecoid_sync_successful.svg';
import styles from './style.css';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import { applicationColors } from '../../../../../style.css';

interface EcoIdSuccessfulScreenProps {
  navigation: any;
}

// This screen will show after any process done successfully.
export default function EcoIdSuccessfulScreen(
  props: EcoIdSuccessfulScreenProps,
) {
  const { navigation } = props;
  const { title, message, button, onButtonPress } = navigation.state.params;

  function onStartPress() {
    if (onButtonPress) {
      navigation.pop();
      onButtonPress();
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <BackgroundImage
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
        />
        <SyncSuccessfulIcon style={styles.icon} width="80%" height="100%" />
      </View>
      <View style={styles.bottomContainer}>
        <Text fontSize="large" bold="bold" style={styles.title}>
          {title || ''}
        </Text>
        <Text style={styles.description} fontSize="small">
          {message || ''}
        </Text>

        <Button
          uppercase={false}
          color={applicationColors.semantic.info.shade500}
          style={styles.button}
          type="primary"
          title={button || ''}
          onPress={onStartPress}
        />
      </View>
    </View>
  );
}
