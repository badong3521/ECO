import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import styles from './style.css';
import TouchableComponent from '../../../../components/TouchableComponent';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import Heading from '../../../../components/Heading';

const ECO_ID_UN_SYNCED_BACKGROUND = require('../../../../assets/profile/bg_unsynced_ecoid.png');
const ECO_ID_UN_SYNCED_ICON = require('../../../../assets/profile/unsynced_ecoid_logo.png');

interface EcofeedbackBannerProps {
  onPress: () => void;
}

// Banner will link to the ecoId screen
export default function EcoIdBanner(props: EcofeedbackBannerProps) {
  const { onPress } = props;
  const { i18n } = useTranslation();
  return (
    <TouchableComponent onPress={onPress}>
      <View style={styles.root}>
        <FastImage
          source={ECO_ID_UN_SYNCED_BACKGROUND}
          style={styles.background}
          resizeMode="stretch"
        />

        <View style={styles.row}>
          <FastImage
            source={ECO_ID_UN_SYNCED_ICON}
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={styles.column}>
            <Heading
              bold="bold"
              size="h3"
              style={styles.title}
              allowFontScaling={false}
            >
              {i18n.t('features.userScreen.syncEcoId')}
            </Heading>
            <Text fontSize="small" style={styles.desc} allowFontScaling={false}>
              {i18n.t('features.userScreen.syncEcoIdDesc')}
            </Text>
          </View>
        </View>
        <Button
          style={styles.button}
          labelStyle={styles.buttonTitle}
          type="secondary"
          title={i18n.t('features.userScreen.syncNow')}
          uppercase={false}
          onPress={onPress}
        />
      </View>
    </TouchableComponent>
  );
}
