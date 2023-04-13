import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import HTML from 'react-native-render-html';
import BackgroundImage from '../../../../assets/ecoid/svg/onboardingBackground.svg';
import MessageIcon from '../../../../assets/dialog/icon_message.svg';
import styles from './style.css';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import { applicationColors } from '../../../../../style.css';
import Firebase from '../../../../services/firebase';

interface EcoIdFailedScreenProps {
  navigation: any;
}
// This screen will be shown when no EcoID process is failed
// Title, message, etc. should be passed as i18n KEYS instead of STRING VALUES converted by i18n
export default function EcoIdFailedScreen(props: EcoIdFailedScreenProps) {
  const i18n = useTranslation();
  const { navigation } = props;
  const { title, message, button, customMessage } = navigation.state.params;

  function onHelpDeskPress() {
    Firebase.track('contact_us_from_ecoid_failed');
    navigation.navigate('HelpDeskScreen');
  }

  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <BackgroundImage
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
        />
        <MessageIcon style={styles.icon} />
      </View>
      <View style={styles.bottomContainer}>
        <Text fontSize="large" bold="bold" style={styles.title}>
          {i18n.t(title) || ''}
        </Text>
        {message && (
          <Text style={styles.description} fontSize="small">
            {i18n.t(message) || ''}
          </Text>
        )}
        {customMessage && (
          <HTML
            html={customMessage}
            containerStyle={styles.customMessageContainer}
            textSelectable
            baseFontStyle={styles.description}
          />
        )}

        <Button
          uppercase={false}
          color={applicationColors.semantic.info.shade500}
          style={styles.button}
          type="primary"
          title={i18n.t(button) || ''}
          onPress={onHelpDeskPress}
        />
      </View>
    </View>
  );
}
