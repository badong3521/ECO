import React from 'react';
import { View } from 'react-native';
import { UseTranslationResponse } from 'react-i18next';
import styles from '../../style.css';
import Text from '../../../../components/Text';
import IconComponent from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';
import TouchableComponent from '../../../../components/TouchableComponent';

interface SectionTitleProps {
  title: string;
  onViewMorePress: () => void;
  i18n: UseTranslationResponse;
}
export default function SectionTitle(props: SectionTitleProps) {
  const { title, onViewMorePress, i18n } = props;
  return (
    <View style={styles.sectionContainer}>
      <Text bold="bold" style={styles.titleSection}>
        {title}
      </Text>
      <TouchableComponent onPress={onViewMorePress}>
        <View style={styles.viewAllContainer}>
          <Text style={styles.viewAll}>{i18n.t('features.home.viewAll')}</Text>
          <IconComponent
            size={applicationDimensions.iconSize}
            color={applicationColors.primary.shade900}
            name="chevron-right"
            iconPack="material"
          />
        </View>
      </TouchableComponent>
    </View>
  );
}
