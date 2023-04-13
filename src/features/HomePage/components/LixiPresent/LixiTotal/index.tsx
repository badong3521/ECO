import { TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { UseTranslationResponse } from 'react-i18next';
import styles from '../style.css';
import LixiIconsSvg from '../../../../../assets/lixi/lixi_icons.svg';
import Text from '../../../../../components/Text';
import IconComponent from '../../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../../style.css';

interface LixiTotalProps {
  i18n: UseTranslationResponse;
  total: number;
  onPress: () => void;
}

// View total of user's lixi and link to the bookmark screen
export default function LixiTotal(props: LixiTotalProps) {
  const { i18n, total, onPress } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.lixiTotalContainer}>
        <LixiIconsSvg style={styles.lixiIcons} />
        <View style={styles.lixiTotalTextContainer}>
          <Text allowFontScaling={false}>
            {i18n.t('features.home.lixi.lixiTotal', {
              total,
            })}
          </Text>
          <View style={styles.viewNowContainer}>
            <Text style={[styles.viewNow]} allowFontScaling={false}>
              {i18n.t('features.home.lixi.viewNow')}
            </Text>
            <IconComponent
              style={styles.rightArrow}
              color={applicationColors.semantic.warning.shade500}
              size={applicationDimensions.iconSize}
              name={applicationIcons.arrowRight}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
