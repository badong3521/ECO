import React from 'react';
import { View, ViewStyle } from 'react-native';
import styles from './style.css';
import Text from '../../../../components/Text';
import IconComponent from '../../../../components/Icon';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

interface PropTypes {
  bookmarkCount?: number;
  style?: ViewStyle;
  labelColor?: string;
}

// Contain the favorite icon and the count for favorited cards
export default function CardBookmarkCount(props: PropTypes) {
  const { bookmarkCount, style, labelColor } = props;

  return (
    <View style={[styles.container, style]}>
      <IconComponent
        size={applicationDimensions.iconSizeSmall}
        name="heart"
        color={applicationColors.secondary.shade500}
        iconPack="feather"
      />
      <Text style={[styles.label, { color: labelColor }]} fontSize="small">
        {(bookmarkCount || 0).toString()}
      </Text>
    </View>
  );
}
