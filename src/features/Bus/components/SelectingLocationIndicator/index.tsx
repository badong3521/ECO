import { View } from 'react-native';
import React from 'react';
import styles from './style.css';
import IconComponent from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';

export default function SelectingLocationIndicator() {
  return (
    <View style={styles.pickLocationContainer}>
      <IconComponent
        size={applicationDimensions.iconSizeBig}
        name="place"
        color="#FF866B"
      />
      <IconComponent
        size={10}
        name={applicationIcons.close}
        color={applicationColors.neutral.shade900}
      />
    </View>
  );
}
