import { UseTranslationResponse } from 'react-i18next';
import { View } from 'react-native';
import * as React from 'react';
import styles from './style.css';
import Text from '../../../../../../../../components/Text';
import IconComponent from '../../../../../../../../components/Icon';
import { applicationColors } from '../../../../../../../../../style.css';

interface MoreStopsLabelProps {
  i18n: UseTranslationResponse;
  moreStopsCount: number;
}

export default function MoreStopsLabel(props: MoreStopsLabelProps) {
  const { i18n, moreStopsCount } = props;
  return (
    <View style={styles.rowWrap}>
      <Text fontSize="small" style={styles.moreStopsLabel}>
        {i18n.t('features.busScreen.stopDetail.moreStops', {
          moreStops: moreStopsCount,
        })}
      </Text>
      <IconComponent
        size={12}
        name="expand-more"
        color={applicationColors.semantic.info.shade700}
      />
    </View>
  );
}
