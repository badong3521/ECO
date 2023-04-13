import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import TouchableComponent from '../../../../components/TouchableComponent';
import { LanguageType } from '../../../User/reducers';

import styles from './style.css';

const BannerImageVn = require('../../../../assets/home/vaccine_registration_vn.png');
const BannerImageEn = require('../../../../assets/home/vaccine_registration_en.png');

interface BannerProps {
  navigation: any;
  userLanguage?: LanguageType;
}

export default function Banner(props: BannerProps) {
  const { navigation, userLanguage } = props;

  async function onBannerPress() {
    return navigation.navigate('VaccineDashboard');
  }

  function renderBanner() {
    if (userLanguage === 'vn') {
      return <FastImage source={BannerImageVn} style={styles.image} />;
    }
    return <FastImage source={BannerImageEn} style={styles.image} />;
  }

  return (
    <TouchableComponent onPress={onBannerPress}>
      <View style={styles.container}>{renderBanner()}</View>
    </TouchableComponent>
  );
}
